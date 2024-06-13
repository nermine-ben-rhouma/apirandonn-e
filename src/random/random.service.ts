import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRandomDto } from './dto/create-random.dto';
import { UpdateRandomDto } from './dto/update-random.dto';
import { Randonnee } from './entities/random.entity';
// import { User } from 'src/user/entities/user.entity';
import { Circuit } from 'src/circuit/entities/circuit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {v2 as cloudinary} from 'cloudinary';
import { RandonneeDetail } from './entities/random.entity-detail';
import { Repository, Like } from 'typeorm';

          
@Injectable()
export class RandomService {
  constructor(
    @InjectRepository(Randonnee)
    private randonneeRepository: Repository<Randonnee>,
    @InjectRepository(RandonneeDetail)
    private readonly randonneeDetailRepository: Repository<RandonneeDetail>,
  ) {}
  private readonly items = [
    { id: 1, name: 'Randonnee' },
    { id: 2, name: 'Item Two' },
    { id: 3, name: 'Item Three' },
  ];

  async create(createRandonneeDto: CreateRandomDto,): Promise<Randonnee> {
  const randonnee = this.randonneeRepository.create(createRandonneeDto);
    cloudinary.config({ 
      cloud_name: 'dzd04po8j', 
      api_key: '417573485835699', 
      api_secret: 'uvfmjSLJDsFYOWgd-SCIGVYWo0E' 
    });
    await cloudinary.uploader.upload(createRandonneeDto.picture, {}, function (error: any, result: any,) {
      if (result['url']) {
        createRandonneeDto.picture = result.url;
      }
      else {
        throw new error.NotFound(
          "picture upload error"
        );
      }
    })
    return await this.randonneeRepository.save(randonnee);

  }


  async findAll() {
    // Include user and location data (optional)
    const randonnees = await this.randonneeRepository.findAndCount({relations:['randonneeDetails','randonneeDetails.circuits','reservations','randonneeDetails.activity','pictures']});
    return randonnees;
  }

  async findOne(id: number){
    // Include user and location data (optional)
    return await this.randonneeRepository.findOne( { where:{id:id},relations:['randonneeDetails','randonneeDetails.circuits','reservations','randonneeDetails.activity','pictures']});
  }

  async update(id: number, updateRandonneeDto: UpdateRandomDto) {
    console.log(updateRandonneeDto,id)
    const randonnee = await this.findOne(id);
    cloudinary.config({ 
      cloud_name: 'dzd04po8j', 
      api_key: '417573485835699', 
      api_secret: 'uvfmjSLJDsFYOWgd-SCIGVYWo0E' 
    });
    await cloudinary.uploader.upload(randonnee.picture, {}, function (error: any, result: any,) {
      if (result['url']) {
        randonnee.picture = result.url;
      }
      else {
        throw new error.NotFound(
          "picture upload error"
        );
      }
    })
    if (!randonnee) {
      throw new Error('Randonnee not found');
    }

    const randonneeupdate =await this.randonneeRepository.preload({
      id:+id,
  
      ...updateRandonneeDto,
    });
    if (!randonneeupdate){
      throw new NotFoundException (`category#${id} not found`);
    } // Update properties
    return await this.randonneeRepository.save(randonneeupdate);
  }

  // async delete(id: number) {
  //   await this.randonneeRepository.delete(id);
  // }

  async delete(id: number): Promise<Randonnee> {
    // Find the randonnee to be updated
    const randonneeToUpdate = await this.randonneeRepository.findOne({
      where: { id: id }
    });

    if (!randonneeToUpdate) {
      throw new Error(`Randonnee with ID ${id} not found`);
    }

    // Preload the randonnee with the updated fields
    const randonneePreload = await this.randonneeRepository.preload({
      ...randonneeToUpdate,
   
      active: false,
    });

    if (!randonneePreload) {
      throw new Error('Error preloading Randonnee');
    }

    // Save the updated randonnee
    return this.randonneeRepository.save(randonneePreload);
  }
  findAllRandonneeDetail(): Promise<RandonneeDetail[]> {
    return this.randonneeDetailRepository.find({ relations: ['circuits', 'activity', 'userId', 'randonneeId'] });
  }

  // async search(query: string): Promise<Randonnee[]> {
  //   if (!query) {
  //     return [];
  //   }
  //   return this.randonneeRepository.find({
  //     where: [
  //       { titre: Like(`%${query}%`) },
  //       { description: Like(`%${query}%`) },
  //     ],
  //   });
  // }
  async search(query: string): Promise<Randonnee[]> {
    return await this.randonneeRepository
      .createQueryBuilder('randonnee')
      .where('randonnee.titre ILIKE :query', { query: `%${query}%` })
      .orWhere('randonnee.description ILIKE :query', { query: `%${query}%` })
      .orWhere('randonnee.difficulte ILIKE :query', { query: `%${query}%` })
      .getMany();
  }
  //findOneRandonneeDetail(id: number): Promise<RandonneeDetail> {
  //  return this.randonneeDetailRepository.findOne()}

  createRandonneeDetail(randonneeDetail: RandonneeDetail): Promise<RandonneeDetail> {
    return this.randonneeDetailRepository.save(randonneeDetail);
  }

  // async updateRandonneeDetail(id: number, randonneeDetail: RandonneeDetail): Promise<RandonneeDetail> {
  //   await this.randonneeDetailRepository.update(id, randonneeDetail);
  //   return this.randonneeDetailRepository.findOne();
  // }

  deleteRandonneeDetail(id: number): Promise<void> {
    return this.randonneeDetailRepository.delete(id).then(() => undefined);
  }
}
