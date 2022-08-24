<template>
    <div class="history-players">
        <div class="search-container">
            <el-input class="input" v-model="params.keyword" placeholder clearable @keyup.enter.native="getData"></el-input>
            <el-button class="button" type="primary" @click="getData">
                <template #icon><Icon name="search" /></template>
                查 询
            </el-button>
        </div>
        <el-table
            class="table-container"
            :data="tableData"
            border
            height="calc(100% - 84px)"
            highlight-current-row
            ref="tableRef"
            @row-contextmenu="onContextmenu"
        >
            <el-table-column type="index" label="序号" width="60"> </el-table-column>
            <el-table-column prop="entityId" label="实体Id" width="95" sortable> </el-table-column>
            <el-table-column prop="name" label="玩家昵称" width="115" sortable> </el-table-column>
            <el-table-column prop="platformId" label="平台Id" width="215" sortable> </el-table-column>
            <!-- <el-table-column prop="platformType" label="平台类型" width="85"> </el-table-column> -->
            <el-table-column prop="lastOnline" label="上次在线" width="165" sortable> </el-table-column>
            <el-table-column prop="totalPlayTime" label="总游戏时长" width="120" :formatter="format_totalPlayTime" sortable> </el-table-column>
            <el-table-column prop="level" label="等级" width="80" sortable> </el-table-column>
            <el-table-column prop="score" label="评分" width="80" sortable> </el-table-column>
            <el-table-column prop="lastPosition" label="玩家坐标" width="130" :formatter="format_position"> </el-table-column>
            <el-table-column prop="zombieKills" label="击杀僵尸" width="105" sortable> </el-table-column>
            <el-table-column prop="playerKills" label="击杀玩家" width="105" sortable> </el-table-column>
            <el-table-column prop="deaths" label="死亡次数" width="105" sortable> </el-table-column>
            <el-table-column prop="ip" label="IP地址" width="135" sortable> </el-table-column>
            <el-table-column prop="crossplatformId" label="跨平台Id" width="215" sortable> </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top: 8px"
            @size-change="getData"
            @current-change="getData"
            :page-sizes="[5, 10, 20, 50, 100]"
            v-model:current-page="params.pageIndex"
            v-model:page-size="params.pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
        <vue3-menus v-model:open="contextmenuVisible" :event="eventVal" :menus="menus" min-width="230">
            <template #icon="{ menu }"><Icon :name="menu.icon"></Icon></template>
            <template #label="{ menu }">{{ menu.label }}</template>
        </vue3-menus>
    </div>
</template>
<script>
export default {
    name: 'Controls.HistoryPlayers',
};
</script>
<script setup>
import { ref, nextTick, reactive } from 'vue';
import { getHistoryPlayers } from '../../api/players';
import { Vue3Menus } from 'vue3-menus';
import { showInventory } from '../../components/Inventory';
import myprompt from '../../utils/myprompt';
import myconfirm from '../../utils/myconfirm';
import { ElMessage } from 'element-plus';

const tableData = ref([]);

const params = reactive({
    pageIndex: 1,
    pageSize: 10,
    desc: true,
    keyword: '',
});
const total = ref(0);

const getData = () => {
    getHistoryPlayers(params).then((data) => {
        tableData.value = data.items;
        total.value = data.total;
    });
};

getData();

const menus = ref([]);
const contextmenuVisible = ref(false);
const eventVal = ref({});
const tableRef = ref();

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
const format_totalPlayTime = (row) => {
    const value = row.totalPlayTime;
    return formatMinute(value);
};
const format_position = (row) => {
    const value = row.lastPosition;
    return `${value.x} ${value.y} ${value.z}`;
};

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
</script>

<style scoped lang="scss">
.history-players {
    height: 100%;
    .search-container {
        display: flex;
        .input {
            width: 400px;
        }
        .button {
            margin-left: 8px;
        }
    }
    .table-container {
        margin-top: 8px;
    }
}
</style>
