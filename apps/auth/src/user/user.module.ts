import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataBaseModule } from '@app/common';
import { UserSchema } from './schemas/user.schema';
import { UserRepo } from './repos/user.repo';

@Module({
  imports:[  DataBaseModule,DataBaseModule.forFeature([{name:'users' ,schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService  ,UserRepo],
  exports:[UserService]

})
export class UserModule {}
