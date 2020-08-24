import { QueryInterface ,DataTypes} from 'sequelize';
const queryAccountTable = {
    up: (QueryInterface: QueryInterface) => {
        return QueryInterface.createTable('Accounts', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
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
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        })
    },
    down: (QueryInterface: QueryInterface) => {
        return QueryInterface.dropTable('Accounts')
    }
}
export {queryAccountTable}