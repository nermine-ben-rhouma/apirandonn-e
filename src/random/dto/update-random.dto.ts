import { PartialType } from '@nestjs/mapped-types';
import { CreateRandomDto } from './create-random.dto';

export class UpdateRandomDto extends PartialType(CreateRandomDto) {
    
    id: number;
  

    titre: string; // Hike title
  
   
    description: string; // Hike description
  
  
    date: Date; // Hike date
  
  
    duree: number; // Hike duration (in minutes or hours)
  

    denivelé: number; // Elevation gain (in meters)
  
   
    difficulte: string; // Difficulty level (e.g., easy, medium, hard)
  
  
    distance: number; // Hike distance (in kilometers)
 
    userId: number | null;
}
