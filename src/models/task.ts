'use strict';
import { Model, DataTypes } from 'sequelize';
import connection from '../config/sequelize';

interface TaskAttributes {
  id:  number;
  title: string;
  description: string;
  status: string;
  limitDate: Date;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: number;
    declare title: string;
    declare description: string;
    declare status: string;
    declare limitDate: Date;

    static associate(models:any) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  }
  Task.init({
    id: {
      allowNull: false,
      primaryKey: true, 
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'Pendiente',
    },
    limitDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize: connection,
    modelName: 'Task',
  });

  export default Task;