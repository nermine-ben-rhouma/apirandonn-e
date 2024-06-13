import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterielService } from './materiel.service';
import { CreateMaterielDto } from './dto/create-materiel.dto';
import { UpdateMaterielDto } from './dto/update-materiel.dto';

@Controller('materiel')
export class MaterielController {
  constructor(private readonly materielService: MaterielService) {}

  @Post('create-materiel')
  create(@Body() createMaterielDto: CreateMaterielDto) {
    return this.materielService.create(createMaterielDto);
  }

  @Get('list-materiel')
  findAll() {
    return this.materielService.findAll();
  }

  @Get('materiel/:id')
  findOne(@Param('id') id: number) {
    return this.materielService.findOne(id);
  }

  @Patch('update-materiel/:id')
  update(@Param('id') id: number, @Body() updateMaterielDto: UpdateMaterielDto) {
    return this.materielService.update(id, updateMaterielDto);
  }

  @Delete('delete-materiel/:id')
  remove(@Param('id') id: number) {
    return this.materielService.remove(id);
  }
}
