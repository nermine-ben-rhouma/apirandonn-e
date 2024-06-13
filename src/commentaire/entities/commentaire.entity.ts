import { Client } from 'src/client/entities/client.entity';
import { Randonnee } from 'src/random/entities/random.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Commentaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true})
  content: string;
  @Column({ nullable: true})
  urlImage: string|null
  @ManyToOne(() => Randonnee, randonnee => randonnee.commentaires)
  @JoinColumn({ name: "randonneeId" })
  randonneeId: number |null ;
  @ManyToOne(() => Client, client => client.commentaires)
  @JoinColumn({ name: "clientId" })
  clientId: Client | null; 
  @Column("boolean", { name: "active", nullable: true, default: () => "true" })
  active: boolean | null;

}