'use strict';
//################################
//SequelizeInstanceImport
import { dbInstance } from './instance';
//ModelfileImport
import { Collections } from './models/collections';
import { Rentals } from './models/rental';
import { Request } from './models/request';
import { News } from './models/news';
import { Users } from './models/user';
//################################
const DB = {
    Sequelize: dbInstance,
    Collections: Collections,
    Rentals: Rentals,
    Request: Request,
    News: News,
    Users: Users,
};

export {
    DB,
    Collections,
    Rentals,
    Request,
    News,
    Users,
};