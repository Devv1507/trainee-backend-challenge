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

/**
 * @swagger
 * components:
 *  schemas:
 *   Task:
 *    type: object
 *    properties:
 *     id:
 *      type: UUID
 *      description: The auto-generated id of the task
 *     userId:
 *      type: string
 *      description: Referenced id of the user who created the task
 *     taskN:
 *      type: string
 *      description: The number of the task based on user (start at 1 and increment by 1)
 *     title:
 *      type: string
 *      description: The title of task
 *     description:
 *      type: string
 *      description: Task description
 *     status:
 *      type: string
 *      description: Task status (pendiente -default, en proceso, completada)
 *     limitDate:
 *      type: date
 *      description: The limit date to complete the task
 *     createdAt:
 *      type: datatime
 *      description: The date and time when the task was created
 *     updatedAt:
 *      type: datatime
 *      description: The date and time when the task was last updated
 *    required:
 *     - title
 *     - description
 *     - limitDate
 *    example:
 *     id: d2d9fdfc-4025-4e4d-b0fb-416c2c55e994
 *     userId: b708a04d-71f9-41bb-8d7f-ba2d8d986abb
 *     taskN: 1
 *     title: Complete tasks management API
 *     description: A CRUD API for managing tasks of users with Typescript and Express
 *     status: pendiente
 *     limitDate: 2024-07-22
 *     createdAt: 2024-07-19 05:01:04.732 -0500
 *     updatedAt: 2024-07-19 05:01:25.030 -0500
 */
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