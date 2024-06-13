import { PartialType } from '@nestjs/mapped-types';
import { CreateCircuitDto } from './create-circuit.dto';

export class UpdateCircuitDto extends PartialType(CreateCircuitDto) {
    id: number;


    ville: string; // City
  
  
    depart: string; // Departure point
  
    
    arrival: string; // Arrival point
  
   
    duree: string; // Duration
  
  
    randonneeId: number;
}
