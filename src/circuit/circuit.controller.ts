import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CircuitService } from './circuit.service';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';

@Controller('circuit')
export class CircuitController {
  constructor(private readonly circuitService: CircuitService) {}

  @Post('create-circuit')
  create(@Body() createCircuitDto: CreateCircuitDto) {
    return this.circuitService.create(createCircuitDto);
  }

  @Get('list-circuit')
  findAll() {
    return this.circuitService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.circuitService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateCircuitDto: UpdateCircuitDto) {
    return this.circuitService.update(+id, updateCircuitDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.circuitService.delete(id);
  }
}
