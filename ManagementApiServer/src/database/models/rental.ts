'use strict';
import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../instance';

class Rentals extends Model {
    public readonly id: number;
    public uuid: string;
    public year: number;
    public grade: number;
    public class: number;
    public number: number;
    public name: string;
    public startDay: Date;
    public returnDay: Date;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

Rentals.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    class: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDay: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    returnDay: {
        type: DataTypes.DATEONLY,
        allowNull:true,
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

export { Rentals }