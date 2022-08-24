<template>
    <div class="online-players">
        <el-table :data="tableData" border height="100%" ref="tableRef" highlight-current-row @row-contextmenu="onContextmenu">
            <el-table-column type="index" label="序号" width="60"> </el-table-column>
            <el-table-column prop="entityId" label="实体Id" width="95" sortable> </el-table-column>
            <el-table-column prop="name" label="玩家昵称" width="115" sortable> </el-table-column>
            <el-table-column prop="platformId" label="平台Id" width="215" sortable> </el-table-column>
            <!-- <el-table-column prop="platformType" label="平台类型" width="85"> </el-table-column> -->
            <el-table-column prop="currentLife" label="存活时长" width="105" :formatter="format_currentLife" sortable> </el-table-column>
            <el-table-column prop="totalPlayTime" label="总游戏时长" width="120" :formatter="format_totalPlayTime" sortable> </el-table-column>
            <el-table-column prop="level" label="等级" width="80" sortable> </el-table-column>
            <el-table-column prop="position" label="玩家坐标" width="130" :formatter="format_position"> </el-table-column>
            <el-table-column prop="zombieKills" label="击杀僵尸" width="105" sortable> </el-table-column>
            <el-table-column prop="playerKills" label="击杀玩家" width="105" sortable> </el-table-column>
            <el-table-column prop="deaths" label="死亡次数" width="105" sortable> </el-table-column>
            <el-table-column prop="expToNextLevel" label="升级所需经验" width="110"> </el-table-column>
            <el-table-column prop="ip" label="IP地址" width="135" sortable> </el-table-column>
            <el-table-column prop="ping" label="延迟" width="60"> </el-table-column>
            <el-table-column prop="landProtectionActive" label="领地石保护状态" width="165" :formatter="format_landProtectionActive"> </el-table-column>
            <el-table-column prop="landProtectionMultiplier" label="领地石保护倍数" width="165"> </el-table-column>
        </el-table>
        <vue3-menus v-model:open="contextmenuVisible" :event="eventVal" :menus="menus" min-width="230">
            <template #icon="{ menu }"><Icon :name="menu.icon"></Icon></template>
            <template #label="{ menu }">{{ menu.label }}</template>
        </vue3-menus>
    </div>
</template>

<script>
export default {
    name: 'Controls.OnlinePlayers',
};
</script>

<script setup>
import { ref, nextTick } from 'vue';
import { Vue3Menus } from 'vue3-menus';
import * as sdtdConsole from '../../api/sdtd-console';
import { getOnlinePlayers } from '../../api/players';
import { showInventory } from '../../components/Inventory';
import myprompt from '../../utils/myprompt';
import myconfirm from '../../utils/myconfirm';
import { ElMessage } from 'element-plus';
import { emitter, eventTypes } from '../../utils/event-hub';

const tableData = ref([]);

emitter.on(eventTypes.OnPlayerUpdate, (data) => {
    tableData.value = data;
});

getOnlinePlayers().then((data) => {
    tableData.value = data;
});

const menus = ref([]);
const contextmenuVisible = ref(false);
const eventVal = ref({});
const tableRef = ref();

const onContextmenu = (row, column, event) => {
    event.preventDefault();
    contextmenuVisible.value = false;
    tableRef.value.setCurrentRow(row);
    const entityId = row.entityId;
    const playerName = row.name;
    menus.value = [
        {
            label: '查看背包',
            click: () => {
                showInventory(entityId, playerName);
            },
            icon: 'view',
            divided: true,
        },
        {
            label: '复制',
            children: [
                {
                    label: '复制玩家昵称',
                    click: () => {
                        navigator.clipboard.writeText(playerName).then(() => {
                            ElMessage.success('复制成功');
                        });
                    },
                },
                {
                    label: '复制玩家实体Id',
                    click: () => {
                        navigator.clipboard.writeText(entityId).then(() => {
                            ElMessage.success('复制成功');
                        });
                    },
                },
                {
                    label: '复制玩家平台Id',
                    click: () => {
                        navigator.clipboard.writeText(row.platformId).then(() => {
                            ElMessage.success('复制成功');
                        });
                    },
                },
                {
                    label: '复制玩家坐标',
                    click: () => {
                        navigator.clipboard.writeText(format_position(row)).then(() => {
                            ElMessage.success('复制成功');
                        });
                    },
                },
            ],
        },
        {
            label: '给予物品',
            click: () => {
                myprompt('{itemName} {count} {quality} {durability}', '请输入物品名称').then(({ value }) => {
                    sdtdConsole.sendConsoleCommand(`ty-gi ${entityId} ${value}`).then(() => {
                        ElMessage.success('发送命令成功');
                    });
                });
            },
        },
        {
            label: '生成实体',
            click: () => {
                myprompt('{spawnEntityIdOrName}', '请输入实体Id或名称').then(({ value }) => {
                    sdtdConsole.spawnEntity(entityId, value).then(() => {
                        ElMessage.success('发送命令成功');
                    });
                });
            },
        },
        {
            label: '传送玩家',
            click: () => {
                myprompt('{target}', '请输入目标, 可为Id或三维坐标').then(({ value }) => {
                    sdtdConsole.telePlayer(entityId, value).then(() => {
                        ElMessage.success('发送命令成功');
                    });
                });
            },
            icon: 'map-location',
            divided: true,
        },
        {
            label: '踢出玩家',
            click: () => {
                myconfirm('此操作将踢出选定玩家, 是否继续?', '提示', 'warning').then(() => {
                    sdtdConsole.kickPlayer(entityId).then(() => {
                        ElMessage.success('发送命令成功');
                    });
                });
            },
        },
        {
            label: '封禁玩家',
            click: () => {
                myprompt('e.g. 2 minutes "Time for a break" "Joel"', '封禁玩家-请输入可选参数', 'warning').then(({ value }) => {
                    sdtdConsole.telePlayer(entityId, value).then(() => {
                        ElMessage.success('发送命令成功');
                    });
                });
            },
            divided: true,
        },
        {
            label: '发送私聊消息',
            click: () => {
                myprompt('{message}', '请输入文本').then(({ value }) => {
                    sdtdConsole.sendMessageToPlayer(entityId, value).then(() => {
                        ElMessage.success('发送命令成功');
                    });
                });
            },
            icon: 'message',
        },
        {
            label: '设置为超级管理员',
            click: () => {
                myconfirm('此操作将把选定玩家设置为超级管理员, 是否继续?', '提示', 'warning').then(() => {
                    sdtdConsole.addAdmin(entityId, 0, '超级管理员-' + playerName).then(() => {
                        ElMessage.success('发送命令成功');
                    });
                });
            },
        },
    ];

    nextTick(() => {
        eventVal.value = event;
        contextmenuVisible.value = true;
    });
};

const formatMinute = (totalMinute) => {
    if (totalMinute < 1) {
        return '小于 1 分钟';
    }

    const day = parseInt(totalMinute / 60 / 24);
    const hour = parseInt((totalMinute / 60) % 24);
    const minute = parseInt(totalMinute % 60);
    let result = '';
    if (day > 0) {
        result = day + ' 天 ';
    }
    if (hour > 0) {
        result += hour + ' 小时 ';
    }
    if (minute > 0) {
        result += minute + ' 分钟 ';
    }
    return result;
};
const format_currentLife = (row) => {
    const value = row.currentLife;
    return formatMinute(value);
};
const format_totalPlayTime = (row) => {
    const value = row.totalPlayTime;
    return formatMinute(value);
};
const format_position = (row) => {
    const value = row.position;
    return `${value.x} ${value.y} ${value.z}`;
};
const format_landProtectionActive = (row) => {
    const value = row.landProtectionActive;
    return value ? '激活' : '未激活';
};
</script>

<style scoped lang="scss">
.online-players {
    height: 100%;
}
</style>
