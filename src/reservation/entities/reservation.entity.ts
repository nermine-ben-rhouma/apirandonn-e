import { Client } from 'src/client/entities/client.entity';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { Randonnee } from 'src/random/entities/random.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';

@Entity("Reservation")
export class Reservation {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;
    @Column({ nullable: false })
    dateReservation: Date; 
    @Column({ nullable: false })
    prix: number; 
    @Column({ nullable:true})
    nombreParticipation: number; 
    @ManyToOne(() => User, (user: User) => user.id)
    @JoinColumn({ name: "userId" })
    userId: number ;  
    @ManyToOne(() => Randonnee, (randonnee) => randonnee.reservations) 
    @JoinColumn({ name: "  randonneeId" })
    randonneeId: number|null ;
    @ManyToOne(() => Client, client => client.reservations)
    clientId: Client | null; 
    @Column({ nullable: true ,default:false})
    isValid: boolean; 
    @Column({ nullable: true, default:false })
    cancel: boolean; 
    @Column("boolean", { name: "active", nullable: true, default: () => "true" })
    active: boolean | null;
    // @OneToOne(() => Commentaire, (commentaire) => commentaire.reservation) 
    // commentaire?: Commentaire; 
    @BeforeInsert()
    eventCreatedAt() {
      this.dateReservation = new Date();
    }
  
}
