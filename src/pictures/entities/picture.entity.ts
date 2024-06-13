

import { Agency } from "src/agency/entities/agency.entity";
import { Materiel } from "src/materiel/entities/materiel.entity";
import { Randonnee } from "src/random/entities/random.entity";
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Picture {

 
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

 
  @Column("text", { name: "url", nullable: true })
  url: string | null;

 
  @Column("text", { name: "cloudinaryid", nullable: true })
  cloudinaryId: string | null;

 
  @Column("boolean", { name: "defaults", nullable: true, default: false })
  defaults: boolean | null;

 
  @Column("timestamp with time zone", { name: "createdat", nullable: true })
  createdAt: Date | null;

 
  @Column("timestamp with time zone", { name: "updatedat", nullable: true })
  updatedAt: Date | null;

 
  @Column("text", { name: "createdby", nullable: true })
  createdBy: number | null;

 
  @Column("text", { name: "updatedby", nullable: true })
  updatedBy: number | null;

 
  @Column("boolean", { name: "active", nullable: true, default: true })
  active: boolean | null;

  @ManyToOne(() => Randonnee, (randonnee) => randonnee.id ) 
  @JoinColumn({ name: "randonneeId" })
  randonneeId: number | null;

  @ManyToOne(() => Agency, (agency) => agency.pictures ,{ onDelete: 'CASCADE' }) 
  agencyId: number | null;


  @ManyToOne(() => Materiel, (materiel) => materiel.id ,{onDelete: 'CASCADE'} ) 
  @JoinColumn({ name: "materielId"} )
  materielId: number | null;
  @BeforeInsert()
  eventCreatedAt() {
    this.createdAt = new Date();
  }
  @BeforeUpdate()
  eventUpdatedAt() {
    this.updatedAt = new Date();
  }


}
