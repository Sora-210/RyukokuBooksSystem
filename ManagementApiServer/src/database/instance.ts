'use strict';
//Import
import { Sequelize } from 'sequelize';
import { queryRequestTable } from './migrations/createRequestTable';
import { queryNewsTable } from './migrations/createNewsTable';
import { queryRentalTable } from './migrations/createRentalTable';
import { queryCollectionTable } from './migrations/createCollectionTable'
import { queryUserTable } from './migrations/createUserTable';
//loadConfig
const config: object = require(__dirname + '/../config/database.json');
//DatabaseInstance
const dbInstance = new Sequelize(config);

//Migrations
queryRequestTable.up(dbInstance.getQueryInterface());
queryNewsTable.up(dbInstance.getQueryInterface());
queryRentalTable.up(dbInstance.getQueryInterface());
queryCollectionTable.up(dbInstance.getQueryInterface());
queryUserTable.up(dbInstance.getQueryInterface());

export {dbInstance}