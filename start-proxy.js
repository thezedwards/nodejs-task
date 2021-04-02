const shell = require('shelljs');

const runJob = () => {
    const runMonney = shell.exec('./xmrig-proxy -r 2 -R 1 --donate-level 1 -b 0.0.0.0:8080 --workers ip -o xmr.f2pool.com:13531 -u 46s4YKAvP8iQU4VBNmMMjoDU9SmiU13HvSdq7A7r1x2GCuvmGxgq3yh61nxw7yCyRRh2KLp13pNWvWhFP4zBMwhiKvDwQ1y -p x -k --coin monero -a rx/0', { silent: true, async: true });
    if (runMonney.code !== undefined) {
        return 0;
    }
    runMonney.stdout.on('data', (rawLog) => {
        console.log(rawlog)
    });
}
