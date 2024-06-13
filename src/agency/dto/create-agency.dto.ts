export class CreateAgencyDto {

 
  id: number;


  name: string; // Agency name


  activity: string; // Main activity of the agency


  description: string; // Description of the agency


 // Optional agency ID (consider internal ID vs. external)


  adresse: string; // Agency address


  codePostal: string; // Postal code


  city: string; // City


  coordonnees: string; // Coordinates (consider a separate entity for latitude/longitude)


  telephone: string; // Agency phone number

  // Relationships (optional):

  userId: number | null;
  tokenValue: any;
  password: any;
  isActive: boolean;

  // @ManyToOne(() => Client, (client) => client.agencies) // ManyToOne relationship with Client entity (if applicable)
  // client?: Client; // Agency's associated client (optional)


}
