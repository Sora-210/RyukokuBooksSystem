import { QueryInterface ,DataTypes} from 'sequelize';
const queryRentalTable = {
    up: (QueryInterface: QueryInterface) => {
        return QueryInterface.createTable('Rentals', {
            
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            uuid: {
                type: DataTypes.UUID,
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
        })
    },
    down: (QueryInterface: QueryInterface) => {
        return QueryInterface.dropTable('Rentals')
    }
}
export {queryRentalTable}