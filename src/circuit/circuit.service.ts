import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Circuit } from './entities/circuit.entity';

@Injectable()
export class CircuitService {
  constructor(
    @InjectRepository(Circuit)
    private circuitRepository: Repository<Circuit>,
  ) {}

  async create(createCircuitDto: CreateCircuitDto): Promise<Circuit> {
    const circuit = this.circuitRepository.create(createCircuitDto);
    return await this.circuitRepository.save(circuit);
  }

  async findAll() {
    return await this.circuitRepository.findAndCount();
  }

  async findOne(id: number) {
    const circuit = await this.circuitRepository.findOne({where:{id:id}});
    if (!circuit) {
      throw new NotFoundException(`circuit with ID ${id} not found`);
    }
    return circuit;
  }

  async update(id: number, updateCircuitDto: UpdateCircuitDto): Promise<Circuit> {
    // const circuit = await this.findOne(id);
    // if (!circuit) {
    //   throw new Error('Circuit not found');
    // }

    // this.circuitRepository.merge(circuit, updateCircuitDto); // Update properties
    // return await this.circuitRepository.save(circuit);
    const circuit =await this.circuitRepository.preload({
      id:id,
    ...updateCircuitDto,
    });
    if (!circuit){
      throw new NotFoundException (`circuit#${id} not found`);
    }
    return await this.circuitRepository.save(circuit)
    
  }

  async delete(id: number): Promise<void> {
    await this.circuitRepository.delete(id);
  }
  // async delete(id: number): Promise<Circuit> {
  //   // Find the circuit to be updated
  //   const circuitToUpdate = await this.circuitRepository.findOne({
  //     where: { id: id }
  //   });

  //   if (!circuitToUpdate) {
  //     throw new Error(`Circuit with ID ${id} not found`);
  //   }

  //   // Preload the circuit with the updated fields
  //   const circuitPreload = await this.circuitRepository.preload({
  //     ...circuitToUpdate,
  //     active: false,
  //   });

  //   if (!circuitPreload) {
  //     throw new Error('Error preloading Circuit');
  //   }

  //   // Save the updated circuit
  //   return this.circuitRepository.save(circuitPreload);
  // }
}
