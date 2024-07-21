import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BeforeCreate,
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
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  taskN!: number;

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

  @BeforeCreate
  static async setTaskNextId(task: Task, options: any) {
    const initTask =  await Task.findOne({
      where: { userId: task.userId },
      order: [['taskN', 'DESC']],
    });
    task.taskN = initTask ? initTask.taskN + 1 : 1;
  }
}

export default Task;