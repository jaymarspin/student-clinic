import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { StudentsModule } from './students/students.module';
import { InventoriesModule } from './inventories/inventories.module';
import { DosagesModule } from './dosages/dosages.module';
import { StocksModule } from './stocks/stocks.module';
import { MedicineTakenModule } from './medicine-taken/medicine-taken.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'raisemax.cmlqfygo9gs6.us-west-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: '123raisemax',
      database: 'pos2',
      synchronize: true, 
      autoLoadEntities: true,
      logging: false, 
      
    }),
    AuthModule,
    UsersModule,
    AccountsModule,
    StudentsModule,
    InventoriesModule,
    DosagesModule,
    StocksModule,
    MedicineTakenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
