import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Randonnee } from 'src/random/entities/random.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    console.log("proic")

    const reservation = this.reservationRepository.create(createReservationDto);
    // reservation.user = user; // Set the user who made the reservation
    // reservation.randonnee = randonnee; // Set the reserved hike

    return await this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    // Include user, hike, and potentially other related data (optional)
    const reservations = await this.reservationRepository.find({
      relations: ['randonneeId', 'clientId'], // Eager loading for related entities
    });
    return reservations;
  }

  async findOne(id: number): Promise<Reservation | undefined> {
    // Include user, hike, and potentially other related data (optional)
    return await this.reservationRepository.findOne( { where:{id:id} ,relations: ['randonneeId', 'clientId'] });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.findOne(id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    // this.reservationRepository.merge(reservation, updateReservationDto); // Update properties
    const randonneeupdate =await this.reservationRepository.preload({
      id:+id,
  
      ...updateReservationDto,
    });
    if (!randonneeupdate){
      throw new NotFoundException (`category#${id} not found`);
    }
    return await this.reservationRepository.save(randonneeupdate);
  }

  // async delete(id: number): Promise<void> {
  //   await this.reservationRepository.delete(id);
  // }
  async delete(id: number,): Promise<Reservation> {
    // Find the reservation to be updated
    const reservationToUpdate = await this.reservationRepository.findOne({
      where: { id: id }
    });

    if (!reservationToUpdate) {
      throw new Error(`Reservation with ID ${id} not found`);
    }

    // Preload the reservation with the updated fields
    const reservationPreload = await this.reservationRepository.preload({
      ...reservationToUpdate,
   
      active: false,
    });

    if (!reservationPreload) {
      throw new Error('Error preloading Reservation');
    }

    // Save the updated reservation
    return this.reservationRepository.save(reservationPreload);
  }
}
