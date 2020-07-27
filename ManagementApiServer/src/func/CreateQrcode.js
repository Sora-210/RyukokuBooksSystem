const { createCanvas, Image } = require('canvas')
const QRcode = require('qrcode')
const fs = require('fs')
const SystemLog = require('../Log.js').getLogger('system')
SystemLog.level = "info"

const CreateQrcode = (uuid, path = "./Qrcode/") => {
    const canvas = createCanvas(300, 300);
    const segment = [
        { data:uuid, mode:"text"}
    ];
    const options = {
        scale: 18,
        errorCorrectionLevel: `L`
    };
    QRcode.toCanvas(canvas, segment, options, (error) => {
        const out = fs.createWriteStream(path + uuid + '.png')
        const stream = canvas.createPNGStream()
        stream.pipe(out)
        out.on('finish',() => {SystemLog.info(`Created Qrcode [${uuid}]`)})
    });
}

module.exports = {
    CreateQrcode
}