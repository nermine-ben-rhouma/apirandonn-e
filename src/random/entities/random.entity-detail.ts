import { Circuit } from 'src/circuit/entities/circuit.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Activity } from 'src/activity/entities/activity.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { Randonnee } from './random.entity';
@Entity("randonDetail")
export class RandonneeDetail {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number
  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: "userid" })
  userId: number;

  @OneToMany(() => Circuit, (circuit: Circuit) => circuit.randonneeDetailId, { cascade: true})
  circuits: Circuit[]
  @ManyToOne(() => Randonnee, (randonnee) => randonnee.randonneeDetails) 
  @JoinColumn({ name: "randonneeId" })
  randonneeId: number | null;

  @OneToMany(() => Activity, (activity:Activity) => activity.randonneeDetailId, { cascade: true})
  activity: Activity[]


}