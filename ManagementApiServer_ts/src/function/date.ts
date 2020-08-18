import dayjs from 'dayjs';
import 'dayjs/locale/ja';
const rentalConfig = require(__dirname + '/../config/rental')

function getToday() {
    const today = new Date();
    return dayjs(today).locale('ja').format('YYYY/MM/DD')
};
function getRemovePeriodDay() {
    const day = new Date();
    day.setDate(day.getDate() - rentalConfig.rentalPeriodDay);
    return dayjs(day).locale('ja').format('YYYY/MM/DD')
};

export {
    getToday,
    getRemovePeriodDay
};