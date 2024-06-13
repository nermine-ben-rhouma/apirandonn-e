import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async create(activityData: Partial<Activity>): Promise<Activity> {
    const activity = this.activityRepository.create(activityData);
    return await this.activityRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return await this.activityRepository.find();
  }

  async findOne(id: number): Promise<Activity> {
    return await this.activityRepository.findOne({ where:{id:id}});
  }

  async update(id: number, activityData: Partial<Activity>): Promise<Activity> {
    // await this.activityRepository.update(id, activityData);
    // return await this.activityRepository.findOne({ where:{id:id}});
    const mark =await this.activityRepository.preload({
      id:+id,
      ... activityData,
    });
    if (!mark){
      throw new NotFoundException (`category#${id} not found`);
    }
    return await this.activityRepository.save(mark)

  }

  async remove(id: number): Promise<void> {
    await this.activityRepository.delete(id);
  }
  async delete(id: number): Promise<Activity> {
    // Find the activity to be updated
    const activityToUpdate = await this.activityRepository.findOne({
      where: { id: id }
    });

    if (!activityToUpdate) {
      throw new Error(`Activity with ID ${id} not found`);
    }

    // Preload the activity with the updated fields
    const activityPreload = await this.activityRepository.preload({
      ...activityToUpdate,
      active: false,
    });

    if (!activityPreload) {
      throw new Error('Error preloading Activity');
    }

    // Save the updated activity
    return this.activityRepository.save(activityPreload);
  }
}
