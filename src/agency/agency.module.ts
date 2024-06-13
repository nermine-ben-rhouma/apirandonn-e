import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './entities/agency.entity';

@Module({
  controllers: [AgencyController],
  providers: [AgencyService],
  imports:[TypeOrmModule.forFeature([Agency])]
})
export class AgencyModule {}
