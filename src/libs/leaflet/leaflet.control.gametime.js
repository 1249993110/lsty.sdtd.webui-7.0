import { getGameStats } from '../../api/server-manage';
import { emitter, eventTypes } from '../event-hub';

L.Control.GameTime = L.Control.extend({
    options: {
        position: 'topleft',
    },

    onAdd: function (map) {
        const name = 'control-gametime';
        const container = L.DomUtil.create('div', name + ' webmap-control game-time');

        container.innerHTML = 'Loading ...';
        L.DomEvent.on(container, 'mousemove', L.DomEvent.stopPropagation);

        getGameStats()
            .then((data) => {
                this._updateGameTimeEvent(data.gameTime, container);
                document.getElementById('mapControlHostileCount').innerText = data.hostiles;
                document.getElementById('mapControlAnimalCount').innerText = data.animals;
                document.getElementById('mapControlOfflinePlayerCount').innerText = data.offlinePlayers;
                document.getElementById('mapControlOnlinePlayerCount').innerText = data.onlinePlayers;
            })
            .catch((error) => {});
        emitter.on(eventTypes.OnGameStatsUpdate, (data) => {
            this._updateGameTimeEvent(data.gameTime, container);
        });

        return container;
    },

    onRemove: function (map) {},

    _updateGameTimeEvent: function (gameTime, container) {
        const days = gameTime.days;
        const hours = gameTime.hours;
        const minutes = gameTime.minutes;

        let time = `Day ${days}, `;
        if (hours < 10) {
            time += '0';
        }
        time += hours;
        time += ':';
        if (minutes < 10) {
            time += '0';
        }
        time += minutes;
        container.innerHTML = time;
    },
});
