<template>
    <div class="console">
        <div id="console-content"></div>
        <div class="send-container">
            <el-input placeholder="请输入内容" v-model="command" clearable @keyup.enter.native="sendCommand"> </el-input>
            <el-button class="button" type="primary" @click="sendCommand">发送命令</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Controls.Console',
};
</script>

<script setup>
import { executeConsoleCommand } from '../../api/server-manage';
import { emitter, eventTypes } from '../../libs/event-hub';

let contentCount = 0;
const contentMaxCount = 1000;
const command = ref('');

const sendCommand = async () => {
    const data = await executeConsoleCommand(command.value);
    data.forEach((item) => {
        appendMessage(item, 1);
    });
};

let messageBuffer = [];
let isActivated = false;
onActivated(() => {
    isActivated = true;
    messageBuffer.forEach((logEntry) => {
        appendMessage(logEntry.message, logEntry.logType);
    });
    messageBuffer = [];
});
onDeactivated(() => {
    isActivated = false;
});

const appendMessage = (message, logType) => {
    const element = document.getElementById('console-content');
    if (contentCount > contentMaxCount) {
        element.removeChild(element.firstElementChild);
    } else {
        contentCount++;
    }

    let color;
    switch (logType) {
        // Error
        case 0:
            color = 'red';
            break;
        // Assert
        case 1:
            color = '#006400';
            break;
        // Warning
        case 2:
            color = 'yellow';
            break;
        // Log
        case 3:
            color = '#00C814';
            break;
        // Exception
        case 4:
            color = 'red';
            break;
        default:
            color = '#00C814';
    }

    const p = document.createElement('p');
    p.innerHTML = `<font color="${color}">${message}</font>`;

    element.appendChild(p);
    p.scrollIntoView();
};

emitter.on(eventTypes.OnConsoleLog, (logEntry) => {
    if (!isActivated) {
        if(messageBuffer.length > 100){
            messageBuffer.shift();
        }
        messageBuffer.push(logEntry);
    } else {
        appendMessage(logEntry.message, logEntry.logType);
    }
});
</script>

<style scoped lang="scss">
.console {
    height: 100%;
    #console-content {
        background-color: rgb(30, 30, 30);
        height: calc(100% - 60px);
        overflow: auto;
        padding: 1px;

        :deep(p) {
            margin: 1px;
            word-wrap: break-word;
            word-break: break-all;
            font-size: 14px;
            white-space: pre-wrap;
        }
    }

    .send-container {
        margin-top: 8px;
        display: flex;

        .button {
            margin-left: 8px;
        }
    }
}
</style>
