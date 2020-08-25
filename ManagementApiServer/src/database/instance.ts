'use strict';
//Import
import { Sequelize } from 'sequelize';
import { queryRequestTable } from './migrations/createRequestTable';
import { queryNewsTable } from './migrations/createNewsTable';
import { queryRentalTable } from './migrations/createRentalTable';
import { queryAccountTable } from './migrations/createAccountTable';
import { queryCollectionTable } from './migrations/createCollectionTable'
import { queryUserTable } from './migrations/createUserTable';
//loadConfig
const config: object = require(__dirname + '/../config/database.json');
//DatabaseInstance
const dbInstance = new Sequelize(config);

//Migrations
// queryRequestTable.down(dbInstance.getQueryInterface());
// queryNewsTable.down(dbInstance.getQueryInterface());
// queryRentalTable.down(dbInstance.getQueryInterface());
// queryAccountTable.down(dbInstance.getQueryInterface());
// queryCollectionTable.down(dbInstance.getQueryInterface());

queryRequestTable.up(dbInstance.getQueryInterface());
queryNewsTable.up(dbInstance.getQueryInterface());
queryRentalTable.up(dbInstance.getQueryInterface());
queryAccountTable.up(dbInstance.getQueryInterface());
queryCollectionTable.up(dbInstance.getQueryInterface());
queryUserTable.up(dbInstance.getQueryInterface());

export {dbInstance}