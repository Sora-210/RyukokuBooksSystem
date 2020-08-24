import { QueryInterface ,DataTypes} from 'sequelize';
const queryRequestTable = {
    up: (QueryInterface: QueryInterface) => {
        return QueryInterface.createTable('Requests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            genre: {
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
        return QueryInterface.dropTable('Requests')
    }
}
export {queryRequestTable}