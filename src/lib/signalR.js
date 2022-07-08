import { LogLevel, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import Store from '../store';
import { emitter, eventTypes } from '../utils/event-hub';

let accessToken = '';
let connection;

function initConnection() {
    const url = import.meta.env.VITE_APP_SIGNALR_URL + '?access-token=' + accessToken;
    connection = new HubConnectionBuilder()
        .withUrl(url, {
            headers: {
                'access-token': accessToken,
            },
            withCredentials: false,
        })
        .configureLogging(LogLevel.Information)
        .build();

    connection.onclose(async () => {
        await start();
    });

    connection.on(eventTypes.OnGameStatsUpdate, (gameStats) => {
        emitter.emit(eventTypes.OnGameStatsUpdate, gameStats);
    });

    connection.on(eventTypes.OnPlayerUpdate, (players) => {
        emitter.emit(eventTypes.OnPlayerUpdate, players);
    });

    connection.on(eventTypes.OnChatMessage, (chatMessage) => {
        emitter.emit(eventTypes.OnChatMessage, chatMessage);
    });

    connection.on(eventTypes.OnConsoleLog, (consoleLog) => {
        emitter.emit(eventTypes.OnConsoleLog, consoleLog);
    });
}

export async function start() {
    try {
        accessToken = Store.getters['getAccessToken'];
        if (accessToken) {
            if (!connection) {
                initConnection();
            }

            await connection.start();
            console.log('SignalR Connected.');
        }
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
}

start();
