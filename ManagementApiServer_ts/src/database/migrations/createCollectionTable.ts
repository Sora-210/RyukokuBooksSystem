import { QueryInterface ,DataTypes} from 'sequelize';
const queryCollectionTable = {
    up: (QueryInterface: QueryInterface) => {
        return QueryInterface.createTable('Collections', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
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
        })
    },
    down: (QueryInterface: QueryInterface) => {
        return QueryInterface.dropTable('Collections')
    }
}
export {queryCollectionTable}