import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import User from './user';

@Table({
  tableName: 'tasks',
  modelName: 'Task',
  timestamps: true,
})
class Task extends Model{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId!: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    defaultValue: 'pendiente',
  })
  status!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  limitDate!: Date;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export default Task;