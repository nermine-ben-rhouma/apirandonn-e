
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate,OneToMany } from 'typeorm';
import { UserRole } from './role'; // Import UserRole enum
import { Agency } from 'src/agency/entities/agency.entity';
import { Randonnee } from 'src/random/entities/random.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column({name:" name", unique: true })
  username: string;
  @Column( "text",{name:"password" ,nullable: true })
  password: string;
  @Column("text" ,{ name:'email',nullable: true })
  email: string;
  @Column("text",{ name:'firstName' ,nullable: true })
  firstName: string;
  @Column("text",{ name:'lastName' ,nullable: true })
  lastName: string;
  // @Column({
  //   type: 'enu',
  //   enum: UserRole,
  //   default: UserRole.USER,
  // })
  @Column("text",{ name:'role' ,nullable: true })
  role: string;
  @Column("date",{  nullable: true })
  createdAt: Date;
  @Column("date",{  nullable: true })
  updatedAt: Date;
  @Column("boolean",{  nullable: true })
  isActive: boolean;
  @Column("text",{  nullable: true })
  tokenValue: string;
  // @OneToMany(() => Agency, (agency: Agency) => agency.userId, { cascade: true})
  // agencies: Agency[];
  @OneToMany(() => Randonnee, (randonne: Randonnee) => randonne.userId, { cascade: true})
  randonnees: Randonnee[]
  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.clientId, { cascade: true})
  reservations: Reservation[]
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

