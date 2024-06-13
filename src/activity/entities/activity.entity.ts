import { Randonnee } from 'src/random/entities/random.entity';
import { RandonneeDetail } from 'src/random/entities/random.entity-detail';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
@Entity('activity')
export class Activity {
    @PrimaryGeneratedColumn({ name: 'id' })

    id: number;

    @Column({ nullable: true })
    title: string;
  
    @Column({ nullable: true})
    description: string;
  
    @Column({ nullable: true })
    duration:string;
  
    @Column({ nullable: true })
    location: string;
    @Column({ nullable: false })
    difficult:string
    @Column("date",{name:'CreateAt', nullable: true})
    date: Date;
    @Column("boolean",{name:'Return_departure_point', nullable: true})
    Return_departure_point:boolean
    @Column("integer",{name:'Distance', nullable: true})
    Distance:number
    
    @ManyToOne(() => RandonneeDetail, (randonneeDetail) => randonneeDetail.activity ) 
    @JoinColumn({ name: "randonneeDetailId" })
    randonneeDetailId: number | null;

    @Column("boolean", { name: "active", nullable: true, default: () => "true" })
    active: boolean | null;


}
