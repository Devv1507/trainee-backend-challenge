'use strict';
import { UUID } from 'crypto';
import { Model, DataTypes } from 'sequelize';
import connection from '../config/sequelize';

interface UserAttributes {
  id: UUID;
  name: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: UUID;
    declare name: string;
    declare email: string;
    declare password: string;

    static associate(models:any) {
      // define association here
      User.hasMany(models.Task, {
        foreignKey: 'userId',
        sourceKey: 'id',
      });
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize: connection,
    modelName: 'User',
  });

  export default User;