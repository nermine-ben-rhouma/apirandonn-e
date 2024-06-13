import { Circuit } from 'src/circuit/entities/circuit.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Activity } from 'src/activity/entities/activity.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { RandonneeDetail } from './random.entity-detail';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { Agency } from 'src/agency/entities/agency.entity';
@Entity()
export class Randonnee {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column("text",{ nullable: true })
  titre: string; // Hike title

  @Column("text",{ nullable: true })
  description: string; // Hike description

  @Column("date",{ nullable: true })
  date: Date; // Hike date

  @Column("integer",{ nullable: true })
  duree: number; // Hike duration (in minutes or hours)

  @Column("integer",{ nullable: true })
  denivele: number; // Elevation gain (in meters)

  @Column("text",{ nullable: true })
  difficulte: string; // Difficulty level (e.g., easy, medium, hard)
  @Column("integer",{ nullable: true })
  distance: number; // Hike distance (in kilometers)

  @Column("integer",{ nullable: true })
  prix: number; // Hike distance (in kilometers)
  @Column("integer",{ nullable: true })
  nomber_de_participant: number; // Hike distance (in kilometers)
  @Column("integer",{ nullable: true })
  nomber_de_place_restant: number;
  @Column("text",{ nullable: true })
  picture: string; // Hike distance (in kilometers)
  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: "userid" })
  userId: number;
  @Column("boolean", { name: "active", nullable: true, default: () => "true" })
  active: boolean | null;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.randonneeId, { cascade: true})
  reservations: Reservation[]
  @OneToMany(() => RandonneeDetail, (randonDetail: RandonneeDetail) => randonDetail.randonneeId, { cascade: true})
  randonneeDetails:RandonneeDetail[]
  @OneToMany(() => Picture, (picture: Picture) => picture.randonneeId)
  pictures?: Picture[];
  @OneToMany(() => Commentaire, commentaire => commentaire.randonneeId)
  commentaires: Commentaire[];
  @ManyToOne(() => Agency, (agency) => agency.randonnees) 
  @JoinColumn({ name: "  randonneeId" })
  agencyId: number ;
 }