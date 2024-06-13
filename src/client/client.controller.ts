import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create-client')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }
  @Post('login')
  findUser(@Body() user:any ) {

    return this.clientService.findUser(user.email,user.password);
  }
  

  @Get('list-client')
  findAll() {
    return this.clientService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete('/:id')
  remove(@Param('id') id:number) {
    return this.clientService.delete(id);
  }
}
