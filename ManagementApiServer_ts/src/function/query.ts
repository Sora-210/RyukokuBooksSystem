import { Transaction } from "sequelize/types";
import { Op } from "sequelize";
import { getRemovePeriodDay } from '../function/date';
//####################################################################
//TypeDefinition
type sortRow = 'DESC' | 'ASC';


interface rentalWhere {
    uuid?: string;
    start_day?: string | {};
    return_day?: string | {};
};
interface rentalOption {
    limit?: number;
    offset?: number;
    order?: [[string, sortRow]];
    where?: rentalWhere;
    transaction?: Transaction;
}
//####################################################################

class rentalQuery {
    private sortRow: string | null;
    private sortDirection: sortRow;

    private limit: number | null;
    private page: number | null;

    private uuid: string | null;
    private status: number | null;

    constructor(query) {
        this.sortRow = query.sortRow || null;
        this.sortDirection = query.sortDirection || 'DESC';

        this.limit = query.limit || null;
        this.page = query.page || null;

        this.uuid = query.uuid || null;
        this.status = query.status || null;
    };

    getWhereOption():object {
        const where: rentalWhere = {};
        if (this.uuid !== null) {
            where.uuid = this.uuid
        };
        switch (this.status) {
            case 0:
                where.return_day = null;
                break;
            case 1:
                where.return_day = { [Op.ne]: null };
                break;
            case 2:
                where.start_day = { [Op.lte]: getRemovePeriodDay()}
                where.return_day = null;
                break;
        };
        return where;
    };

    getOption(transaction:Transaction):object {
        const options: rentalOption = {};
        options.where = this.getWhereOption();
        if (this.sortRow !== null) {
            options.order = [[this.sortRow,this.sortDirection]]
        }
        options.limit = (this.limit === null ? 20 : this.limit);
        if (this.page === null && this.page <= 0) {
            options.offset = 1
        } else {
            options.offset = (this.page - 1) * options.limit
        }
        options.transaction = transaction;
        return options;
    };
};
//####################################################################
export {
    rentalQuery
}