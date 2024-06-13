import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('create-activity')
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get('activity')
  findAll() {
    return this.activityService.findAll();
  }

  @Get('activity/:id')
  findOne(@Param('id') id: number) {
    return this.activityService.findOne(id);
  }

  @Patch('activity-update/:id')
  update(@Param('id') id: number, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete('activity-delete/:id')
  remove(@Param('id') id:number) {
    return this.activityService.remove(id);
  }
}
