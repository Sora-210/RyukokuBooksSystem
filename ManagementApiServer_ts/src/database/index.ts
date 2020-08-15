'use strict';
//################################
//SequelizeInstanceImport
import { dbInstance } from './instance'
//ModelfileImport
import { Accounts } from './models/account'
import { Collections } from './models/collections'
import { Rentals } from './models/rental';
import { Request } from './models/request';
import { News } from './models/news';
//################################
const DB = {
    Sequelize: dbInstance,
    Accounts: Accounts,
    Collections: Collections,
    Rentals: Rentals,
    Request: Request,
    News: News,
};

export {
    DB,
    Accounts,
    Collections,
    Rentals,
    Request,
    News,
};