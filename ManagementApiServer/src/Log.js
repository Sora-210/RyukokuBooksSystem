const Log = require('log4js')
const logPath = "./log/"

Log.configure({
    appenders: {
        system: {
            type: 'file',
            filename: logPath + 'system.log'
        },
        consoleOut:{ 
            type: 'console'
        },
        access: {
            type: 'file',
            filename: logPath + 'access.log'
        },
    },
    categories: {
        default: {
            appenders: ['system','consoleOut'],
            level: 'info'
        },
        access: {
            appenders: ['access','consoleOut'],
            level: 'info'
        }
    }
})

module.exports = Log