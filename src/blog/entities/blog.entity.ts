import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
@Entity('blog')
export class Blog {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;
    @Column({ nullable: true })
    title: string;
    @Column({ nullable: true})
    description: string;
    @Column({ nullable: true})
    urlImage: string
    @Column("boolean", { name: "active", nullable: true, default: () => "true" })
    active: boolean | null;

}
