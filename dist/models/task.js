'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class Task extends sequelize_1.Model {
    static associate(models) {
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
        type: sequelize_1.DataTypes.INTEGER,
    },
    title: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'Pendiente',
    },
    limitDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Task',
});
exports.default = Task;
