import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  HasMany
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import Task from './task';

/**
 * @openapi
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *     id:
 *      type: UUID
 *      description: The auto-generated id of the user
 *     name:
 *      type: string
 *      description: The name of the user
 *     email:
 *      type: string
 *      description: The email of the user
 *     password:
 *      type: string
 *      description: The password of the user
 *     rePassword:
 *      type: string
 *      description: Password confirmation
 *     createdAt:
 *      type: datatime
 *      description: The date and time when the user was created
 *     updatedAt:
 *      type: datatime
 *      description: The date and time when the user was last updated
 *    required:
 *     - name
 *     - email
 *     - password
 *     - rePassword
 *    example:
 *     id: b708a04d-71f9-41bb-8d7f-ba2d8d986abb
 *     name: Marcos
 *     email: marcos@gmail.com
 *     password: adcadc
 *     rePassword: adcadc
 *     createdAt: 2024-07-19 05:01:04.732 -0500
 *     updatedAt: 2024-07-19 05:01:25.030 -0500
 */
@Table({
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
})
class User extends Model{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
  })
  refreshToken!: string;

  @HasMany(() => Task)
  tasks!: Task[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Encrypt the password before creating the user
  @BeforeCreate
  static async encryptPassword(user: User) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
}

export default User; 