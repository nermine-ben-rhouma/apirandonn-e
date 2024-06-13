import { Module } from '@nestjs/common';
import { CircuitService } from './circuit.service';
import { CircuitController } from './circuit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Circuit } from './entities/circuit.entity';

@Module({
  controllers: [CircuitController],
  providers: [CircuitService],
  imports:[TypeOrmModule.forFeature([Circuit])]
})
export class CircuitModule {}
