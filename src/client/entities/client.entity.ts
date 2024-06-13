import { Commentaire } from "src/commentaire/entities/commentaire.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn ,OneToMany } from 'typeorm';
@Entity("client")
export class Client {
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
  @Column("text",{ name:'telephone' ,nullable: true })
  telephone: string;
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
  @Column("boolean", { name: "active", nullable: true, default: () => "true" })
  active: boolean | null;


    @OneToMany(() => Reservation, reservation => reservation.clientId)
    reservations: Reservation[];
    @OneToMany(() => Commentaire, commentaire => commentaire.clientId)
    commentaires: Commentaire[];
}
