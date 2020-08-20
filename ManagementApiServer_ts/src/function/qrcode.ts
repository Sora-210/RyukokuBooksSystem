const { createCanvas } = require('canvas')
const { toCanvas } = require('qrcode')
const fs = require('fs')

const createQrcode = (uuid: string, path = "./Qrcode/"):void => {
    const canvas = createCanvas(300, 300);
    const segment = [
        { data: uuid, mode: "text" }
    ];
    const options = {
        scale: 18,
        errorCorrectionLevel: `L`
    };
    toCanvas(canvas, segment, options, (error) => {
        const out = fs.createWriteStream(path + uuid + '.png');
        const stream = canvas.createPNGStream();
        stream.pipe(out);
    });
};

export {
    createQrcode
}