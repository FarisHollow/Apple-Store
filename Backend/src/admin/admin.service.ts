import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Session } from '@nestjs/common';
import { AddAdminDTO, AdminLoginDTO,  ProfileDTO,  } from './admin.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { AdminEntity} from './admin.entity';

import * as bcrypt from 'bcrypt';

import { NotificationEntity } from './notification.entity';
import { CurrentDate, CurrentTime } from './current.date';
import { Response } from 'express';
import path, { join } from 'path';
import { ProfileEntity } from './profile.entity';
import { AddManagerDTO, ManagerEntity } from '../manager/manager.entity';



@Injectable()
export class AdminService {

  
  constructor(
    @InjectRepository(AdminEntity)
    private AdminRepo: Repository<AdminEntity>,
    @InjectRepository(ManagerEntity)
    private managerRepo: Repository<ManagerEntity>,
   
    @InjectRepository(NotificationEntity)
    private notificationRepo: Repository<NotificationEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
  ) {}



  async updateProfile(email: string, updateProfile: ProfileDTO): Promise<ProfileEntity | string> {
    const admin = await this.AdminRepo.findOne({ where: { email } });

    if (!admin) {
      return 'Admin not found';
    }

    const profile = await this.profileRepo.findOne({
      where: { admin: admin },
      relations: ['admin'],
    });

    if (!profile) {
      return "Don't find any profile";
    }

    profile.bio = updateProfile.bio;
    profile.education = updateProfile.education;
    profile.filenames = updateProfile.filenames;
    profile.location = updateProfile.location;
    profile.experience = updateProfile.experience;
    profile.website = updateProfile.website;


    await this.profileRepo.save(profile);

    const notiFication: NotificationEntity = new NotificationEntity();
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.Message = 'Updated Profile';
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    notiFication.admin = admin;
    await this.notificationRepo.save(notiFication);

    return profile; // Return the updated profile
  }
  


  async updatePass(email: string, updatePass: AddAdminDTO): Promise<AdminEntity> {
    const salt = await bcrypt.genSalt();
    updatePass.password = await bcrypt.hash(updatePass.password, salt);
    
    const updateResult = await this.AdminRepo.update({ email }, updatePass);
    const admin = await this.AdminRepo.findOne({
      where: {
        email: email,
      },
    });
    
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.admin = admin;
    notiFication.Message = "Account Edited Successfully";
    
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    
    await this.notificationRepo.save(notiFication);
    
    return admin;
    
  }
  


  async ViewMyProfile(email: string): Promise<{ admin: AdminEntity }> {
    const admin = await this.AdminRepo.findOne({ where: { email }, relations: ['profile'] });
  
    if (!admin) {
      throw new NotFoundException('Admin profile not found');
    }
  
    admin.password = undefined;
  
    return { admin };
  }


  
  
  
  

  async addProfile(profileDTO: ProfileDTO, email: string): Promise<ProfileDTO> {
    const admin = await this.AdminRepo.findOne({ where: { email } });
  
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
  
    const profile = new ProfileEntity();
    profile.bio = profileDTO.bio;
    profile.location = profileDTO.location;
    profile.website = profileDTO.website;
    profile.education = profileDTO.education;
    profile.experience = profileDTO.experience;
    profile.filenames = profileDTO.filenames;
  
    admin.profile = profile;
    profile.admin = admin;
  
    await this.AdminRepo.save(admin);
    await this.profileRepo.save(profile);
  
    return profileDTO;
  }
  

  async getProfilePictureFilename(email: string): Promise<string> {
    const admin = await this.AdminRepo
      .createQueryBuilder('admin')
      .leftJoinAndSelect('admin.profile', 'profile')
      .where('admin.email = :email', { email })
      .getOne();
  
    if (admin && admin.profile && admin.profile.filenames) {
      return admin.profile.filenames;
    }
  
    throw new Error('Profile picture not found');
  }

  
  async changePicture(email: string, filename: string): Promise<string> {
    const admin = await this.AdminRepo.findOne({ where: { email } });
    console.log(filename);
  
    await this.profileRepo.update({ admin: admin }, { filenames: filename });
  
    const notiFication: NotificationEntity = new NotificationEntity();
    notiFication.admin = admin;
    notiFication.Message = "Profile Picture Uploaded";
  
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
  
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
  
    await this.notificationRepo.save(notiFication);
  
    return 'File uploaded successfully';
  }

  
  

  async signup(data: AddAdminDTO): Promise<string> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    console.log(data.password);
    console.log("Account Created Successfully");
    try {
      const savedAdmin = await this.AdminRepo.save(data);
  
      const notiFication: NotificationEntity = new NotificationEntity();
      notiFication.admin = savedAdmin; 
      notiFication.Message = "Account Created Successfully";
      const currentDate: CurrentDate = new CurrentDate();
      const currentTime: CurrentTime = new CurrentTime();
  
      notiFication.date = currentDate.getCurrentDate();
      notiFication.time = currentTime.getCurrentTime();
      await this.notificationRepo.save(notiFication);
  
      return "Registration successful";
    } catch (error) {
      console.error(error);
      return "Registration failed";

    }
  }



    
  

  async signIn(data: AdminLoginDTO): Promise<boolean> {
    const userData = await this.AdminRepo.findOneBy({ email: data.email });
  
    if (userData !== undefined) {
      const match: boolean = await bcrypt.compare(data.password, userData.password);
      const notiFication: NotificationEntity = new NotificationEntity();
    const currentDate: CurrentDate = new CurrentDate();
    const currentTime: CurrentTime = new CurrentTime();
    notiFication.Message = "Your logged in a device";
    notiFication.date = currentDate.getCurrentDate();
    notiFication.time = currentTime.getCurrentTime();
    notiFication.admin = userData;
    await this.notificationRepo.save(notiFication);
      return match;
    }
  
    return false;
  }
    
  
    async Logout(@Session() session, email: string) {
      const Search = await this.AdminRepo.find({
        select: {
          name: true,
          id: true,
          password: false
        },
        where: {
          email: email,
        }
      });
    
      const admin = Search[0];
    
      const notiFication: NotificationEntity = new NotificationEntity();
      notiFication.admin = admin;
      notiFication.Message = "Logged Out";
    
      const currentDate: CurrentDate = new CurrentDate();
      const currentTime: CurrentTime = new CurrentTime();
    
      notiFication.date = currentDate.getCurrentDate();
      notiFication.time = currentTime.getCurrentTime();
    
      await this.notificationRepo.save(notiFication);
    
      session.destroy();
      return "Logout Successfully";
    }


 async viewNotification(email: string): Promise<NotificationEntity[]> {
        const doctor = await this.AdminRepo.findOne({
          where: {
            email: email,
          },
        });
      
        const notifications = await this.notificationRepo.find({
          where: {
            admin: doctor,
          },
        });
      
        return notifications;
      }      

  
  async deleteAllNotification(email: string): Promise<{ message: string }> {
    const admin = await this.AdminRepo.findOne({ where: { email } });
  
    if (!admin) {
      return { message: 'Admin not found' };
    }
  
    const deleteResult = await this.notificationRepo.delete({ admin });
  
    if (deleteResult.affected > 0) {
      return { message: 'All notifications removed successfully' };
    } else {
      return { message: 'No notifications to remove' };
    }
  }
  
  


//Dashboard
getDashboard():any {
  return "Admin Dashboard";
}










//Manager section

async addManager(data: AddManagerDTO, email: string): Promise<ManagerEntity> {
  const admin = await this.AdminRepo.findOne({
    where: { email: email },
  });

  if (!data.name) {
    throw new Error('Name is required.'); 
  }
  if (!data.email) {
    throw new BadRequestException('Email is required');
  }
  if (!data.password) {
    throw new BadRequestException('Password is required');
  }
  if (!data.Degree) {
    throw new BadRequestException('Degree is required');
  }
  if (!data.Blood_group) {
    throw new BadRequestException('Blood group is required');
  }
  if (!data.Gender) {
    throw new BadRequestException('Gender is required');
  }
  if (!data.User) {
    throw new BadRequestException('User is required');
  }

  const addManager: ManagerEntity = new ManagerEntity();
  addManager.name = data.name;
  addManager.email = data.email;

  const salt = await bcrypt.genSalt();
  data.password = await bcrypt.hash(data.password, salt);
  addManager.password = data.password; 
  addManager.Degree = data.Degree; 
  addManager.Blood_group = data.Blood_group; 
  addManager.Gender = data.Gender; 
  addManager.User = data.User; 


  addManager.admin = admin;

  const savedManager = await this.managerRepo.save(addManager);

  return savedManager;
}





async getAllManager(): Promise<ManagerEntity[]|string> {

  const managers = await this.managerRepo.find({
    select: ['name', 'email', 'id', 'Degree'],
    relations: ['admin'],
  });

  if (managers.length === 0) {
    return "Manager not found"
  }

  const updatedManager: ManagerEntity[] = managers.map(manager => {
    const updatedManager = { ...manager };
    if (updatedManager.admin) {
        updatedManager.name = `${updatedManager.name}. Added by admin ${updatedManager.admin.name}`;
      delete updatedManager.admin.password;
      delete updatedManager.admin.email;
    }
    return updatedManager;
  });

  return updatedManager;
}


async getManagerById(id: number): Promise<ManagerEntity> {
  return this.managerRepo.findOne({ 
    where: { id },
    select: ['id', 'name', 'email', 'Gender', 'Degree' ],
  });
}


  async deleteAllManagers(): Promise<{ message: string }> {
    const deleteResult = await this.managerRepo.delete({});
    
    if (deleteResult.affected > 0) {
      return { message: 'All managers removed successfully' };
    } else {
      return { message: 'No manager to remove' };
    }
  }
  
  async deleteManagerbyId(id: number): Promise<{ message: string }> {
   
  
    const manager = await this.managerRepo.findOne({ where: { id } });
  
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }
  
    await this.managerRepo.remove(manager);
    
    return { message: `Manager of ID ${id} deleted successfully` };
  }
  

  async updateManagerById(id: number, data: Partial<ManagerEntity>, name: string): Promise<{ message: string; updatedManager: ManagerEntity }> {
    const manager = await this.managerRepo.findOne({ where: { id } });
    
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }
  
    const updatedManager = Object.assign(manager, data);
    const savedManager = await this.managerRepo.save(updatedManager);
    
    return { message: `Manager named ${name} of ID number ${id} updated successfully`, updatedManager: savedManager };
  }




 

  
  
  
}