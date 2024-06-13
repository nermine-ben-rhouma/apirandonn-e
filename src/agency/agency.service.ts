import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { Agency } from './entities/agency.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>,
  ) {}

  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    createAgencyDto.isActive = true;
    createAgencyDto.tokenValue = this.generateAlphabeticToken(50);
    if (createAgencyDto.password) {
      createAgencyDto.password = await this.hashPassword(createAgencyDto.password);
    }
    return await this.agencyRepository.save(createAgencyDto);
  }

  generateAlphabeticToken(length: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@&$';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      token += alphabet[randomIndex];
    }
    return token;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async findAgency(email: string, password: string): Promise<any> {
    const user = await this.agencyRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Agency not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }

  async findAll() {
    return await this.agencyRepository.findAndCount({ relations: ['pictures', 'randonnees']});
  }

  async findOne(id: number): Promise<Agency> {
    const agency = await this.agencyRepository.findOne({ where: { id: id }, relations: ['pictures', 'randonnees'] });
    if (!agency) {
      throw new NotFoundException(`Agency with ID ${id} not found`);
    }
    return agency;
  }

  async update(id: number, updateAgencyDto: UpdateAgencyDto): Promise<Agency> {
    const agencyPreload = await this.agencyRepository.preload({
      id: +id,
      ...updateAgencyDto,
    });
    if (!agencyPreload) {
      throw new NotFoundException(`Agency with ID ${id} not found`);
    }
    return await this.agencyRepository.save(agencyPreload);
  }

  // async remove(id: number): Promise<void> {
  //   const agency = await this.findOne(id);
 
   
  
  //   await this.agencyRepository.remove(agency);
  // }
  async remove(id: number): Promise<Agency> {
    const agencyToUpdate = await this.agencyRepository.findOne({
      where: { id: id }
    });

    if (!agencyToUpdate) {
      throw new Error(`Agency with ID ${id} not found`);
    }

    const agencyPreload = await this.agencyRepository.preload({
      ...agencyToUpdate,
      active: false,
    });

    if (!agencyPreload) {
      throw new Error('Error preloading Agency');
    }

    return this.agencyRepository.save(agencyPreload);
  }
}
