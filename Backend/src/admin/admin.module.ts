import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { NotificationEntity } from './notification.entity';
import { ProfileEntity } from './profile.entity';
import { ManagerEntity } from '../manager/manager.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminEntity,
      ManagerEntity,
      NotificationEntity,
      ProfileEntity
      
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService], 
})
export class AdminModule {}