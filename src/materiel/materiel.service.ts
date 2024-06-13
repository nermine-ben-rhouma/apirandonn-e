import { Injectable } from '@nestjs/common';
import { CreateMaterielDto } from './dto/create-materiel.dto';
import { UpdateMaterielDto } from './dto/update-materiel.dto';
// materiel.service.ts

import { InjectRepository } from '@nestjs/typeorm';
import { Materiel } from './entities/materiel.entity';
import { Repository } from 'typeorm';


@Injectable()
export class MaterielService {
  constructor(
    @InjectRepository(Materiel)
    private materielRepository: Repository<Materiel>,
  ) {}

  findAll() {
    return this.materielRepository.findAndCount({relations:['pictures']});
  }

  findOne(id: number): Promise<Materiel> {
    return this.materielRepository.findOne( { where:{id:id},relations:['pictures']});
  }

  create(materiel: CreateMaterielDto): Promise<Materiel> {
    return this.materielRepository.save(materiel);
  }

  async update(id: number, materiel: UpdateMaterielDto): Promise<Materiel> {
    await this.materielRepository.update(id, materiel);
    return this.materielRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.materielRepository.delete(id);
  }
  // async remove(id: number): Promise<Materiel> {
  //   // Find the materiel to be updated
  //   const materielToUpdate = await this.materielRepository.findOne({
  //     where: { id: id }
  //   });

  //   if (!materielToUpdate) {
  //     throw new Error(`Materiel with ID ${id} not found`);
  //   }

  //   // Preload the materiel with the updated fields
  //   const materielPreload = await this.materielRepository.preload({
  //     ...materielToUpdate,

  //     active: false,
  //   });

  //   if (!materielPreload) {
  //     throw new Error('Error preloading Materiel');
  //   }

  //   // Save the updated materiel
  //   return this.materielRepository.save(materielPreload);
  // }
}
