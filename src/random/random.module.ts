import { Module } from '@nestjs/common';
import { RandomService } from './random.service';
import { RandomController } from './random.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Randonnee } from './entities/random.entity';
import { RandonneeDetail } from './entities/random.entity-detail';

@Module({
  controllers: [RandomController],
  providers: [RandomService],
  imports:[TypeOrmModule.forFeature([Randonnee,RandonneeDetail])]
})
export class RandomModule {}
