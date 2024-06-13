import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const newUser = this.clientRepository.create(createClientDto);
    newUser.isActive = true;
    newUser.tokenValue = this.generateAlphabeticToken(50);
    if (newUser.password) {
      newUser.password = await this.hashPassword(newUser.password);
    }
    return await this.clientRepository.save(newUser);
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

  async findUser(email: string, password: string): Promise<Client> {
    const user = await this.clientRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }

  async findAll() {
    return await this.clientRepository.findAndCount();
  }

  async findOne(id: number): Promise<Client | undefined> {
    return await this.clientRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<Client | undefined> {
    return await this.clientRepository.findOne({ where: { username } });
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    // const client = await this.findOne(id);
    // if (!client) {
    //   throw new Error('User not found');
    // }
    // if (updateClientDto.password) {
    //   updateClientDto.password = await this.hashPassword(updateClientDto.password);
    // }
    const clientPreload = await this.clientRepository.preload({
      id: +id,
      ...updateClientDto,
    });
    if (!clientPreload) {

      throw new NotFoundException(`category #${id} not found`);
    }
    return await this.clientRepository.save(clientPreload);
  }
  async delete(id: number,): Promise<Client> {
    // Find the client to be updated
    const clientToUpdate = await this.clientRepository.findOne({
      where: { id: id }
    });

    if (!clientToUpdate) {
      throw new Error(`Client with ID ${id} not found`);
    }

    // Preload the client with the updated fields
    const clientPreload = await this.clientRepository.preload({
      ...clientToUpdate,
      active: false,
    });

    if (!clientPreload) {
      throw new Error('Error preloading Client');
    }

    // Save the updated client
    return this.clientRepository.save(clientPreload);
  }

  // async delete(id: number): Promise<boolean> {
  //   const result = await this.clientRepository.delete(id);
  //   return result.affected > 0;
  // }
}
