import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm';
import { PictureDto } from './dto/picture.dto';
import { Picture } from './entities/picture.entity';
// const cloudinary = require('cloudinary').v2
import {v2 as cloudinary} from 'cloudinary';
          
@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,

  ) { }

  async find() {
    return await this.pictureRepository.findAndCount();
  }

  async findById(id: number): Promise<Picture> {
    return await this.pictureRepository.findOne(
      {
        where: { id: id }
      }
    );
  }

  async createPicture(createPictureDto: PictureDto) {

      cloudinary.config({ 
        cloud_name: 'dzd04po8j', 
        api_key: '417573485835699', 
        api_secret: 'uvfmjSLJDsFYOWgd-SCIGVYWo0E' 
      });
      await cloudinary.uploader.upload(createPictureDto.url,{ eager: [{ fetch_format: "auto" } ]}, function (error: any, result: any,) {
          if (result?.eager[0].url) {
            createPictureDto.url = result.eager[0].url;  
        }
      })
    
    const picture = this.pictureRepository.create({ ...createPictureDto });
    return this.pictureRepository.save(picture);
  }

  async replaceById(id: number, picture: PictureDto) {
    const picturePreload = await this.pictureRepository.preload({
      id: +id,
      ...picture,
      

    });
    if (!picturePreload) {

      throw new NotFoundException(`Picture #${id} not found`);
    }
    return this.pictureRepository.save(picturePreload);
  }

  // async remove(id: number) {
  //   return this.pictureRepository.delete(id)
  // }
  async remove(id: number,): Promise<Picture> {
    // Find the picture to be updated
    const pictureToUpdate = await this.pictureRepository.findOne({
      where: { id: id }
    });

    if (!pictureToUpdate) {
      throw new Error(`Picture with ID ${id} not found`);
    }

    // Preload the picture with the updated fields
    const picturePreload = await this.pictureRepository.preload({
      ...pictureToUpdate,
      active: false,
    });

    if (!picturePreload) {
      throw new Error('Error preloading Picture');
    }

    // Save the updated picture
    return this.pictureRepository.save(picturePreload);
  }

  async removePictures(idsPictures: number[]) {
    idsPictures?.forEach(async id => {
      await this.remove(id)
    });
  }
}
