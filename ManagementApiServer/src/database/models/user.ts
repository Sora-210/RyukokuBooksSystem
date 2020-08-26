'use strict';
import { Model, DataTypes } from 'sequelize';
import {dbInstance} from '../instance'


class Users extends Model {
    public readonly id: number;
    public name: number;
    public password_hash: string
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: dbInstance,
    timestamps: true,
})
export {Users};