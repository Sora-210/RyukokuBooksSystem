'use strict';
//Import
import { Sequelize } from 'sequelize';
import { queryRequestTable } from './migrations/createRequestTable';
import { queryNewsTable } from './migrations/createNewsTable';
import { queryRentalTable } from './migrations/createRentalTable';
import { queryAccountTable } from './migrations/createAccountTable';
import { queryCollectionTable } from './migrations/createCollectionTable'
//loadConfig
const config: object = require(__dirname + '/../config/database.json');
//DatabaseInstance
const dbInstance = new Sequelize(config);
//Migrations
queryRequestTable.up(dbInstance.getQueryInterface());
queryNewsTable.up(dbInstance.getQueryInterface());
queryRentalTable.up(dbInstance.getQueryInterface());
queryAccountTable.up(dbInstance.getQueryInterface());
queryCollectionTable.up(dbInstance.getQueryInterface())

try {
    dbInstance.authenticate()
    console.log('Database Connect Success!')
} catch(err) {
    console.error(err)
}


export {dbInstance}