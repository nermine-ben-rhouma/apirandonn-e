import { Randonnee } from 'src/random/entities/random.entity';
import { RandonneeDetail } from 'src/random/entities/random.entity-detail';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column ,BeforeUpdate ,BeforeInsert, ManyToOne, JoinColumn} from 'typeorm';
@Entity("Circuit")
export class Circuit {
    @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false })
  ville: string; // City

  @Column({ nullable: false })
  depart: string; // Departure point

  @Column({ nullable: false })
  arrival: string; // Arrival point

  @Column({ nullable: false })
  duree: string; // Duration
  @Column({ nullable: false })
  createdAt: Date;
  @ManyToOne(() => RandonneeDetail, (randonneerDetail: RandonneeDetail) => randonneerDetail.circuits)
  @JoinColumn({ name: "randonneeDetailId" })
  randonneeDetailId: number;
  @Column({ nullable: true })
  updatedAt: Date;
  @Column("boolean", { name: "active", nullable: true, default: () => "true" })
  active: boolean | null;


  @BeforeInsert()
  eventCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  eventUpdatedAt() {
    this.updatedAt = new Date();
  }
  
}
