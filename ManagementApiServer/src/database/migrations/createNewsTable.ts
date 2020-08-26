import { QueryInterface ,DataTypes} from 'sequelize';
const queryNewsTable = {
    up: (QueryInterface: QueryInterface) => {
        return QueryInterface.createTable('News', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            }
        })
    },
    down: (QueryInterface: QueryInterface) => {
        return QueryInterface.dropTable('News')
    }
}
export {queryNewsTable}