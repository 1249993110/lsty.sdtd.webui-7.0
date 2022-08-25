import { LogLevel, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { useUserInfoStore } from '../store/user-info';
import { emitter, eventTypes } from './event-hub';

const createConnection = (accessToken) => {
    const url = import.meta.env.VITE_APP_SIGNALR_URL + '?access-token=' + accessToken;
    const connection = new HubConnectionBuilder()
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

    return connection;
}

let connection;

export async function start() {
    try {
        const accessToken = useUserInfoStore().accessToken;
        if (accessToken) {
            if (!connection) {
                connection = createConnection();
            }

            await connection.start();
            console.log('SignalR Connected.');
        }
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
}
