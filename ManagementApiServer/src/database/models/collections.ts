'use strict';
import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../instance';

class Collections extends Model {
    public readonly id: number;
    public isbn: bigint;
    public uuid: string;
    public registrationDate: Date;
    public note: string;
    public ndc: string;
    public rentalStatus: boolean;
    public rentalId: number;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

Collections.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    isbn: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    registrationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ndc: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rentalStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    rentalId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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

export { Collections }