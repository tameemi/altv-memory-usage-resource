
import fs from 'fs';

let timer;

const changeTime = async (currentDate,isFirstRunning) => {
	if (isFirstRunning) {
		return;
	}
	everyMinuteEvent(currentDate);
};

const runTimer = (isFirstRunning) => {
	const currentDate = new Date();
	const remainingMs = (60 - currentDate.getSeconds()) * 1000 + (1000 - currentDate.getMilliseconds());
	changeTime(currentDate, !!isFirstRunning);
	clearTimeout(timer);
	timer = setTimeout(() => {
		runTimer();
	}, remainingMs);
};

runTimer(true);

function everyMinuteEvent(currentDate) {
    const {rss, heapTotal, heapUsed, external } = process.memoryUsage()
    let memInfo = {
        timestamp: Number(currentDate),
        rss,heapTotal,heapUsed,external
    };
    console.log((heapUsed / 1024 / 1024) + 'mb');
    const fileLocation = new URL('../output-data/memoryUsage.json', import.meta.url);
    fs.appendFile(fileLocation, JSON.stringify(memInfo) + ',\r\n', (err) => {
        if (err) throw err;
        //console.log('memory usage appended');
    })
}