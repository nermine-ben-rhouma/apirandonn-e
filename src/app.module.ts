import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AgencyModule } from './agency/agency.module';
import { RandomModule } from './random/random.module';
import { CircuitModule } from './circuit/circuit.module';
import { ReservationModule } from './reservation/reservation.module';
import { ClientModule } from './client/client.module';
import { CommentaireModule } from './commentaire/commentaire.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ActivityModule } from './activity/activity.module';
import { PicturesModule } from './pictures/pictures.module';
import { BlogModule } from './blog/blog.module';
import { MaterielModule } from './materiel/materiel.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',//utilisateur
        password: 'postgres',// mote de passe
        database: 'randoone',// nom base 
        autoLoadEntities: true,
        synchronize: true,
      }),
  
        }),
        ConfigModule.forRoot(),UserModule,  AgencyModule, RandomModule, CircuitModule, ReservationModule,
        ClientModule,ActivityModule,PicturesModule,RandomModule, BlogModule, MaterielModule, CommentaireModule //CommentaireModule
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
