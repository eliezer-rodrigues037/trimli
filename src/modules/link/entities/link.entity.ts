import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Link {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The URL to be shortened',
    example: 'https://example.com',
    type: String,
    format: 'uri',
  })
  @Column()
  sourceURl: string;

  @ApiProperty({
    description: 'The code used to identify the shortened link',
    maxLength: 6,
  })
  @Column({
    type: 'varchar',
    length: 6,
    unique: true,
    update: false,
  })
  shortCode: string;

  @ApiProperty({
    description: 'The amount of times the link has been clicked',
    default: 0,
  })
  @Column({
    type: 'int',
    default: 0,
  })
  clickCount: number;

  @ApiProperty({
    description: 'The URL to redirect to',
    type: String,
    format: 'uri',
  })
  redirectUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiHideProperty()
  deletedAt: Date | null;
}
