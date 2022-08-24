// using ES6 modules

import mitt from 'mitt';

// emitter
export const emitter = mitt();

export const eventTypes = {
    OnGameStatsUpdate: 'OnGameStatsUpdate',
    OnPlayerUpdate: 'OnPlayerUpdate',
    OnChatMessage: 'OnChatMessage',
    OnConsoleLog: 'OnConsoleLog',
};