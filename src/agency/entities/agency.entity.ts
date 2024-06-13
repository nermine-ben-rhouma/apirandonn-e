import { Client } from 'src/client/entities/client.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { Randonnee } from 'src/random/entities/random.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Agency {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column({ nullable: false,})
  name: string; // Agency name
  @Column({ nullable: false })
  activity: string; // Main activity of the agency
  @Column({ nullable: false })
  description: string; // Description of the agency
  @Column("text",{ name:'firstName' ,nullable: true })
  firstName: string;
  @Column("text",{ name:'lastName' ,nullable: true })
  lastName: string;
  @Column({ nullable: true })
  adresse: string; // Agency address
  @Column({ nullable: true })
  codePostal: string; // Postal code
  @Column({ nullable: true })
  city: string; // City
  @Column({ nullable: true })
  coordonnees: string; // Coordinates (consider a separate entity for latitude/longitude)
  @Column({ name:"telephone" ,nullable: true })
  telephone: string; // Agency phone number
  @Column("text",{  nullable: true  })
  tokenValue: string;
  @Column("text",{ name:'role' ,nullable: true ,default:"agence"})
  role: string;
  @Column( "text",{name:"password" ,nullable: true })
  password: string;
  @Column("text" ,{ name:'email',nullable: true })
  email: string;
  // Relationships (optional):
  @ManyToOne(() => User, ((user: User) => user.id))
  userId: number | null;
  @OneToMany(() => Picture, (picture: Picture) => picture.agencyId, { cascade: true, onDelete: 'CASCADE' })
  pictures: Picture[];
  @OneToMany(() => Randonnee, (randonnee: Randonnee) => randonnee.agencyId,  { cascade: true, onDelete: 'CASCADE' })
 randonnees: Randonnee[];
 @Column("boolean", { name: "active", nullable: true, default: () => "true" })
 active: boolean | null;

 

}
