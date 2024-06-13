import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Repository } from 'typeorm';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Randonnee } from 'src/random/entities/random.entity';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
  imports:[TypeOrmModule.forFeature([Reservation])]
})
export class ReservationModule {
 
}
