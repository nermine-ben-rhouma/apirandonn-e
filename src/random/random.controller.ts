import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RandomService } from './random.service';
import { CreateRandomDto } from './dto/create-random.dto';
import { UpdateRandomDto } from './dto/update-random.dto';
import { RandonneeDetail } from './entities/random.entity-detail';

@Controller('random')
export class RandomController {
  constructor(private readonly randomService: RandomService) {}

  @Post('create-randoone')
  create(@Body() createRandomDto: CreateRandomDto) {
    return this.randomService.create(createRandomDto);
  }
  @Get('search')
  search(@Query() queryDto:any) {
    console.log(queryDto)
    return this.randomService.search(queryDto.query);
  }
  
  @Post('create-randoone-detail')
  createDetail(@Body() createRandomDto: RandonneeDetail) {
    return this.randomService.createRandonneeDetail(createRandomDto);
  }

  @Get('list-randoon')
  findAll() {
    return this.randomService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id:number) {
    return this.randomService.findOne(id);
  }

  @Patch('update-randonnee/:id')
  update(@Param('id') id:number, @Body() updateRandomDto: UpdateRandomDto) {
    return this.randomService.update(id, updateRandomDto);
  }

  @Delete('delete-randonnee/:id')
  remove(@Param('id') id: number) {
    return this.randomService.delete(id);
  }
}
