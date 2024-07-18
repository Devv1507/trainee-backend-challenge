'use strict';
import { UUID } from 'crypto';
import { Sequelize, Model, DataTypes} from 'sequelize';

interface UserAttributes {
  id: UUID;
  name: string;
  email: string;
  password: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> {
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
    sequelize,
    modelName: 'User',
  });
  return User;
};