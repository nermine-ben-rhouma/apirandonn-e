import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post('create-agency')
  create(@Body() createAgencyDto: CreateAgencyDto) {
    return this.agencyService.create(createAgencyDto);
  }
  @Post('login')
  findUser(@Body() user:any ) {

    return this.agencyService.findAgency(user.email,user.password);
  }

  @Get('list-agency')
  findAll() {
    return this.agencyService.findAll();
  }

  @Get('agency-detail/:id')
  findOne(@Param('id') id:number) {
    return this.agencyService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateAgencyDto: UpdateAgencyDto) {
    return this.agencyService.update(+id, updateAgencyDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.agencyService.remove(id);
  }
}
