import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
    id: number;
  @Column({ type: 'text' })
    userName: string;
  @Column({ type: 'text', unique: true })
    email: string;
  @Column({ type: 'text' })
    password: string;
  @Column({type: 'text', default: 'client'})
    role: string;

  @OneToMany(() => Profile, (profile) => profile.user)
    profiles: Profile[];
}
