import { PartialType } from '@nestjs/mapped-types';
import { CreateAgencyDto } from './create-agency.dto';

export class UpdateAgencyDto extends PartialType(CreateAgencyDto) {
    id: number;


    name: string; // Agency name
  
  
    activity: string; // Main activity of the agency
  
  
    description: string; // Description of the agency
  
  
    agenceId: string; // Optional agency ID (consider internal ID vs. external)
  
  
    adresse: string; // Agency address
  
  
    codePostal: string; // Postal code
  
  
    city: string; // City
  
  
    coordonnees: string; // Coordinates (consider a separate entity for latitude/longitude)
  
  
    telephone: string; // Agency phone number
  
    // Relationships (optional):
  
    userId: number | null;
}
