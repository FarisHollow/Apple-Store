import { Column, PrimaryGeneratedColumn, OneToMany, Entity, OneToOne, JoinColumn } from 'typeorm';

import { NotificationEntity } from './notification.entity';
import { ProfileEntity } from './profile.entity';
import { ManagerEntity } from '../manager/manager.entity';

@Entity("Admin")
export class AdminEntity {
@PrimaryGeneratedColumn()
id: number;

@Column({ type: 'varchar', length: 150, nullable: true })
name: string;

@Column({ type: "varchar", length: 150, nullable: true })
email: string;



@Column({ nullable: true })
password: string;

@Column({ nullable: true })
Gender: string;
@Column({ nullable: true })
Degree: string;
@Column({ nullable: true })
Blood_group: string;
@Column({nullable: true})
User: string;



  @OneToMany(() => ManagerEntity, manager => manager.admin)
  manager: AdminEntity[];


  @OneToMany(() => NotificationEntity, notification => notification.admin)
  notification: AdminEntity[];


  @OneToOne(() => ProfileEntity, profile => profile.admin, { cascade: true })
  @JoinColumn()
  profile: ProfileEntity;

  
}




