import alt, {Player} from 'alt';

import './modules/memoryUsage'


alt.on('playerConnect', (player) => {
    player.memGraph = false;
});

alt.on('playerDisconnect', (player, reason) => {
    if(player.memGraph){
        clearInterval(player.memGraph);
    }

});

alt.onClient('memGraphStatus',(player, status) => {
    if(status){
        player.memGraph = setInterval(() => {
            memGraphDataUpdate(player);
        }, 1000);
    } else {
        clearInterval(player.memGraph);
        player.memGraph = false;
    }
});

function memGraphDataUpdate(player) {
    const {rss, heapTotal, heapUsed, external } = process.memoryUsage()
    let memInfo = {
        rss,heapTotal,heapUsed,external
    };
    let sMemInfo = JSON.stringify(memInfo);
    alt.emitClient(player, 'graphUpdate', sMemInfo);
}