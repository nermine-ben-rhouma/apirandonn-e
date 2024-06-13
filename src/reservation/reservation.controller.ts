import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('create-reservation')
  create(@Body() createReservationDto: CreateReservationDto) {
    console.log(createReservationDto)
    return this.reservationService.create(createReservationDto);
  }

  @Get('list-reservation')
  findAll() {

    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch('update-reservation/:id')
  update(@Param('id') id: number, @Body() updateReservationDto: UpdateReservationDto) {
    console.log("heelo service")
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reservationService.delete(id);
  }
}
