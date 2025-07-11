import { ApiExtraModels, ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Link } from 'src/modules/link/entities/link.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ApiExtraModels()
export class User {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  @ApiProperty({
    description: 'The URL to redirect to',
    type: String,
    format: 'uri',
  })
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @ApiProperty({ type: () => [Link] })
  @OneToMany(() => Link, (link) => link.user)
  links: Relation<Link[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    const saltOrRounds = 10;
    const password = this.password;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    this.password = hashedPassword;
  }
}
