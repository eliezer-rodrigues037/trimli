import { ApiExtraModels, ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { hashPassword } from 'src/modules/auth/utils/auth.utils';
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

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  passwordHash: string;

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
    const hashedPassword = await hashPassword(this.passwordHash);

    this.passwordHash = hashedPassword;
  }
}
