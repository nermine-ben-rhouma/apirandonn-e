import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {v2 as cloudinary} from 'cloudinary';
@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find();
  }

  async findOne(id: number): Promise<Blog> {
    return await this.blogRepository.findOne({where:{id:id}});
  }

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    
    cloudinary.config({ 
      cloud_name: 'dzd04po8j', 
      api_key: '417573485835699', 
      api_secret: 'uvfmjSLJDsFYOWgd-SCIGVYWo0E' 
    });
    await cloudinary.uploader.upload(createBlogDto.urlImage,{ eager: [{ fetch_format: "auto" } ]}, function (error: any, result: any,) {
        if (result?.eager[0].url) {
          createBlogDto.urlImage = result.eager[0].url;  
      }
    })
    return await this.blogRepository.save(createBlogDto);
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const bolgPreload = await this.blogRepository.preload({
      id: +id,
      ...updateBlogDto,
    });
console.log('service',bolgPreload)
    if (!bolgPreload) {

      throw new NotFoundException(`bolg #${id} not found`);
    }
    return await this.blogRepository.save(bolgPreload);
  }

  async remove(id: number): Promise<void> {
    await this.blogRepository.delete(id);
  }
  // async remove(id: number): Promise<Blog> {
  //   // Find the blog post to be updated
  //   const blogToUpdate = await this.blogRepository.findOne({
  //     where: { id: id }
  //   });

  //   if (!blogToUpdate) {
  //     throw new Error(`Blog post with ID ${id} not found`);
  //   }

  //   // Preload the blog post with the updated fields
  //   const blogPreload = await this.blogRepository.preload({
  //     ...blogToUpdate,
  //     active: false,
  //   });

  //   if (!blogPreload) {
  //     throw new Error('Error preloading Blog post');
  //   }

  //   // Save the updated blog post
  //   return this.blogRepository.save(blogPreload);
  // }
}
