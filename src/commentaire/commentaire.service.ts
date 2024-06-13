import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { Commentaire } from './entities/commentaire.entity';
import {v2 as cloudinary} from 'cloudinary';


@Injectable()
export class CommentaireService {
  constructor(
    @InjectRepository(Commentaire)
    private commentaireRepository: Repository<Commentaire>,
  ) {}

  async create(createCommentaireDto: CreateCommentaireDto): Promise<Commentaire> {
        if (createCommentaireDto.urlImage!=null){  cloudinary.config({ 
          cloud_name: 'dzd04po8j', 
          api_key: '417573485835699', 
          api_secret: 'uvfmjSLJDsFYOWgd-SCIGVYWo0E' 
        });
        await cloudinary.uploader.upload(createCommentaireDto.urlImage,{ eager: [{ fetch_format: "auto" } ]}, function (error: any, result: any,) {
            if (result?.eager[0].url) {
              createCommentaireDto.urlImage = result.eager[0].url;  
          }
        })}
  
    console.log('commentaire',createCommentaireDto)

    return this.commentaireRepository.save(createCommentaireDto);
  }

  async findAll(): Promise<Commentaire[]> {
    return this.commentaireRepository.find({ relations: ['clientId', 'randonneeId'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} commentaire`;
  }

  update(id: number, updateCommentaireDto: UpdateCommentaireDto) {
    return `This action updates a #${id} commentaire`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentaire`;
  }
}
