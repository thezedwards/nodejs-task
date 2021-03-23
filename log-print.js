const NumberLog = (ref, number) => {
    ref[0] = number + 1;
}
const stepLog = [1];

const ojectLog = {
    1: (log) => {
        if (log.indexOf('mCPU') !== -1) {
            NumberLog(stepLog, stepLog[0]);
            console.log(`-- ${log.split('mCPU          ')[1]}`);
        }
    },
    2: (log) => {
        if (log.indexOf('NUMA') !== -1) {
            NumberLog(stepLog, stepLog[0]);
            const core = log.split('[0m[1;36m');
            console.log(`--${core[1].split('[0mC')[0]} - ${core[2].split('[0mT')[0]} - ${core[3].split('[0m')[0]}`);
        }
    },
    3: (log) => {
        if (log.indexOf('mMEMORY') !== -1) {
            NumberLog(stepLog, stepLog[0]);
            console.log(`-- ${log.split('[0m[1;36m')[1].split('[0m[0;36m')[0]}`);
        }
    },
    4: (log) => {
        if (log.split('[1;37m')[1]) {
            switch (log.split('[1;37m')[1].split('[0m')[0].trim()) {
                case 'net':
                    if (log.indexOf('new job') !== -1) {
                        console.log('-- new task add to queue ~~~');
                    }
                    else if (log.indexOf('[0;31m') !== -1) {
                        log.indexOf('no active pools') ? console.log('-- ### server no active ###') : console.log(log);
                    }
                    else if (log.indexOf('use pool') !== -1) {
                        console.log('-- server is running :))');
                    } else {
                        console.log(`-- other net info: ${log}`);
                    }
                    break;
                case 'randomx':
                    if (log.indexOf('init dataset') !== -1) {
                        console.log('-- create data');
                    }
                    else if (log.indexOf('dataset ready') !== -1) {
                        console.log('-- create data done!');
                    }
                    break;
                case 'cpu':
                    if (log.indexOf('accepted') !== -1) {
                        const cpuLog = log.split('accepted[0m ')[1];
                        console.log(`-- ping server ${cpuLog.split(' diff')[0].replace('/', '-')} - ${cpuLog.split('[0;37m')[1]}`);
                    }
                    else if (log.indexOf('huge pages [1;32m100%') !== -1) {
                        console.log('-- server good ^^^');
                    }
                    break;
                case 'miner':
                    if (log.indexOf('speed') !== -1) {
                        console.log(`-- ${Math.random().toString(36).substring(2)}: ${log.split('[0m 10s/60s/15m')[1].trim().replace(/H\/s/g, '')}`);
                    }
                    break;
                default:
                    break;
            }
        }
    },
}

const printLog = (rawLog) => {
    rawLog.split(/\r?\n/).forEach((log) => {
        ojectLog[stepLog[0]](log);
    })
}

module.exports = {
    printLog
}
