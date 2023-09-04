import { Controller, Post, Get, Put, Delete, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseInterceptors, UploadedFile, Session, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Res, BadRequestException, ParseFloatPipe, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AddAdminDTO, AdminLoginDTO, ProfileDTO} from './admin.dto';
import{AdminEntity} from './admin.entity';
import { MulterError, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotificationEntity } from './notification.entity';
import { SessionGuard } from './session.guards';
import { Response } from 'express';
import session from 'express-session';
import { ProfileEntity } from './profile.entity';
import { plainToClass } from 'class-transformer';
import { join } from 'path';
import { AddManagerDTO, ManagerEntity } from '../manager/manager.entity';






@Controller('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}




  @Put('/EditProfile')
  @UseGuards(SessionGuard)
  Edit(@Body() updateProfile: ProfileDTO,@Session() session): Object {
    return this.adminService.updateProfile(session.email, updateProfile);
    
  }



  @Put('/EditPass')
  @UseGuards(SessionGuard)
  EditPass(@Body() updatePass: AddAdminDTO,@Session() session): Object {
    return this.adminService.updatePass(session.email, updatePass);
    
  }

  @Get('/ViewMyProfile')
  @UseGuards(SessionGuard)
  ViewMyProfile(@Session() session): Promise<{ admin: AdminEntity }> {
    return this.adminService.ViewMyProfile(session.email);
  }


  @Post('/addProfile')
  @UseGuards(SessionGuard)
  @UseInterceptors(FileInterceptor('image',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    async addProfile(
      @Body() profileDTO: ProfileDTO,
      @Session() session,
      @UploadedFile() imageobj: Express.Multer.File
    ): Promise<ProfileDTO> {
      const email = session.email;
      profileDTO.filenames = imageobj.filename;
      const profile = await this.adminService.addProfile(profileDTO, email);
      return profile;
    }

  @Get('/myphoto')
  @UseGuards(SessionGuard)
  async showProfilePicture(@Session() session: any, @Res() res: Response): Promise<void> {
    try {
      const email: string = session.email;
      const filename: string = await this.adminService.getProfilePictureFilename(email);
      
      const filePath = join(__dirname, '..', '..', 'uploads', filename);
      
      res.sendFile(filePath);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  @Put('/changePicture')
  @UseGuards(SessionGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new Error('LIMIT_UNEXPECTED_FILE'), false);
        }
      },
      limits: { fileSize: 300000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = Date.now() + file.originalname;
          cb(null, fileName);
        },
      }),
    }),
  )
  async changePicture(
    @UploadedFile() file: Express.Multer.File,
    @Session() session,
  ): Promise<string> {
    const fileName = file.filename;
    return await this.adminService.changePicture(session.email, fileName);
  }

  


  @Post('/signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() admin: AddAdminDTO): Promise<string> {
    return this.adminService.signup(admin);
  }

    //Notification

    @Get('/notification')
    @UseGuards(SessionGuard)
    viewNotification(@Session() session): Promise<NotificationEntity[]> {
      return this.adminService.viewNotification(session.email);
    }
  


    @Delete('/deletenotifications')
    @UseGuards(SessionGuard)
    async deleteAllNotifications(@Session() session): Promise<{ message: string; }> {
      return this.adminService.deleteAllNotification(session.email);
    
    }
    


@Post('/signin')
async signIn(@Body() data: AdminLoginDTO, @Session() session) {
  if (session.email == undefined) {
    const loginSuccess = await this.adminService.signIn(data);

    if (loginSuccess) {
      session.email = data.email;
      return "Login successful";
    } else {
      return "Login Failed";
    }
  } else {
    return "Already logged in an account. Please log out first.";
  }
}
    
    
@Post('/signout')
async logout(@Session() session) {
  return this.adminService.Logout(session,session.email);


}





  
//Manager Section

@Post('/addManager')
@UseGuards(SessionGuard)
addManager(@Body() manager: AddManagerDTO,@Session() session): object {
  return this.adminService.addManager(manager ,session.email);
}

  @Get('/viewAllManager')
  @UseGuards(SessionGuard)
  async getAllManager(): Promise<ManagerEntity[] | string> {
    return this.adminService.getAllManager();
  }
  
  @Get('/Manager/:id')
  @UseGuards(SessionGuard)
  async getManagerById(@Param('id') id: number, ): Promise<object> {
    return this.adminService.getManagerById(id);
  }




  
  @Delete('/deleteManagers')
  deleteAllManagers(): object {
    return this.adminService.deleteAllManagers();
  }

  @Delete('/Manager/:id')
  @UseGuards(SessionGuard)
  deleteManager(@Param('id') id: number, ): Promise<{ message: string }> {
    return this.adminService.deleteManagerbyId(id);
  }
  

  @Put('/Manager/:id')
  updateManagerById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<ManagerEntity>,
    @Body('name') name: string,
  ): Promise<{ message: string; updatedManager: ManagerEntity }> {
    return this.adminService.updateManagerById(id, data, name);
  }
  

    









  
  

}

