import { Picture } from "src/pictures/entities/picture.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity(' Materiel')
export class Materiel {
     
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

 
  @Column("text", { name: "title", nullable: true })
  title: string;

 
  @Column("text", { name: "cloudinaryid", nullable: true })
  description: string ;

 

  @Column("integer", { name: "price", nullable: true })
  price: number;

 
  @Column("date", { name: "createdat", nullable: true })
  createdAt: Date;

 
  @Column("timestamp with time zone", { name: "updatedat", nullable: true })
  updatedAt: Date | null;

 
  @Column("text", { name: "createdby", nullable: true })
  createdBy: number | null;

 
  @Column("text", { name: "updatedby", nullable: true })
  updatedBy: number | null;

 
  @Column("boolean", { name: "active", nullable: true, default: true })
  active: boolean | null;

  @OneToMany(() => Picture, (picture: Picture) => picture.materielId)
  pictures?: Picture[];

 

  @BeforeInsert()
  eventCreatedAt() {
    this.createdAt = new Date();
  }
  @BeforeUpdate()
  eventUpdatedAt() {
    this.updatedAt = new Date();
  }

}
