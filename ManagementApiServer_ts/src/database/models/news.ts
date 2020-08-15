'use strict';
import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../instance';

class News extends Model {
    public readonly id: number;
    public content: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

News.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    content: {
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

export { News }