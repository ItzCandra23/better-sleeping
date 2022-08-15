import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";

function getSleepingFix(): number {
    const players = bedrockServer.serverInstance.getPlayers();
    const sleeping = players.filter((pl) => {pl.isSleeping()}).length;

    if (sleeping === 0) return 0;
    if (sleeping % 2 === 0) return sleeping;

    return sleeping+1;
}

const HMM = setInterval(() => {
    const players = bedrockServer.serverInstance.getPlayers();
    const time = bedrockServer.level.getTime();

    if (players.length/2 === getSleepingFix()) {
        bedrockServer.level.setTime(time+1);
    }
}, 100);

events.serverStop.on(() => { clearInterval(HMM) });