import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/controllers/users/users.controller';
import { AuthController } from './auth/controllers/auth/auth.controller';
import { Auth } from './typeorm/entities/Auth';

@Module({
  imports: [
    // Configuring TypeOrm with mysql
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'Noneedpassword23!',
      database: 'Production',
      entities: [User, Auth],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService],
})
export class AppModule {}
