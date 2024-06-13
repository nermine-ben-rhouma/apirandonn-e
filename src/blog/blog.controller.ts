import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get('list-blog')
  findAll() {
    return this.blogService.findAll();
  }

  @Get('blog/:id')
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(+id);
  }

  @Patch('update-blog/:id')
  update(@Param('id') id:number, @Body() updateBlogDto: UpdateBlogDto) {
    console.log("conntroller")
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete('delete-bolg/:id')
  remove(@Param('id') id: number) {
    return this.blogService.remove(id);
  }
}
