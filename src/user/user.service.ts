import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Not } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt'; // For password hashing
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
  
    let newUser=this.userRepository.create(createUserDto)
    newUser.isActive=true
    const tokenLength = 50;
    newUser.tokenValue = this.generateAlphabeticToken(tokenLength);
    newUser.password=(await this.hashPassword(newUser.password)).toString()
    return await this.userRepository.save(newUser);
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

async  hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Number of salt rounds to use for hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;


}

async findUser(email:string,password:string):Promise<User>{
  console.log("email",email)
  const newUser = await this.userRepository.findOne({  where: { email:email } });
  console.log("password",password)
 
  if (!newUser) {
    throw new Error('User not found');
  }
  else{
  const isPasswordValid = await bcrypt.compare(password, (newUser.password).toString());
   if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  return newUser
  }
}
  async findAll() {
    return await this.userRepository.findAndCount(); // Exclude password from response
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({where:{id:id}}); // Exclude password from response
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({where:{username:username}}); 
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    // const { password, ...userData } = updateUserDto; // Exclude password from update

    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(password, salt);
    //   userData.password = hashedPassword;
    // }

    // this.userRepository.merge(user, userData);
    return await this.userRepository.save(user);
  }

  // async delete(id: number): Promise<void> {
  //   const  user=this.userRepository.delete(id)
  //   let response
  //   if (!user) {
  //     throw new Error('User not found');
  //     response =false
  //   }else{
  //     response=true
  //     // this.userRepository.delete(id)
  //   }
  
  //   return response
  
    
   
  // }
  async delete(id: number): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({
      where: { id: id }
    });

    if (!userToUpdate) {
      throw new Error(`User with ID ${id} not found`);
    }

    const userPreload = await this.userRepository.preload({
      ...userToUpdate,
  
      active: false,
    });

    if (!userPreload) {
      throw new Error('Error preloading User');
    }

    return this.userRepository.save(userPreload);
  } 
}
