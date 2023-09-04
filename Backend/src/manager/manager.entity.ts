import { IsString, Matches, IsEmail, IsEmpty, isString } from 'class-validator';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity, ManyToOne, OneToOne } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';


export class AddManagerDTO {
  @IsString({ message: "invalid name" })
  @Matches(/^[a-zA-Z ]+$/, { message: "Enter a proper name" })
  name: string;

  @IsEmail({}, { message: "invalid email" })
  email: string;
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/, { message: 'Password must be at least 8 characters, contain at least 1 special character, and have at least 1 capital letter' })
  password: string;
  Gender: string;
  Degree: string;
  Blood_group: string;
  User: string;


  id: number; 
}





@Entity("Manager")
export class ManagerEntity {
  @Column()

  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  @Column()
  Gender: string;
  @Column()
  Degree: string;
  @Column()
  Blood_group: string;
  @Column()
  User: string;

  @PrimaryGeneratedColumn()
  id: number;



    @ManyToOne(() => AdminEntity, admin => admin.manager)
  admin: AdminEntity;

}
