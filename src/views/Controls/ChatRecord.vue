<template>
    <div class="history-players">
        <div class="search-container">
            <el-input class="input" v-model="params.keyword" placeholder clearable @keyup.enter.native="getData"></el-input>
            <el-button class="button" type="primary" @click="getData">
                <template #icon><Icon name="search" /></template>
                查 询
            </el-button>
        </div>
        <el-table class="table-container" :data="tableData" border height="calc(100% - 84px)" highlight-current-row ref="tableRef">
            <el-table-column type="index" label="序号" width="60"> </el-table-column>
            <el-table-column prop="createdDate" label="日期" width="165" sortable> </el-table-column>
            <el-table-column prop="entityId" label="实体Id" width="95" sortable> </el-table-column>
            <el-table-column prop="senderName" label="发送者昵称" width="180" sortable> </el-table-column>
            <el-table-column prop="chatType" label="类型" width="80" sortable :formatter="format_chatType"> </el-table-column>
            <el-table-column prop="message" label="消息内容" sortable> </el-table-column>
            <el-table-column prop="platformId" label="平台Id" width="215" sortable> </el-table-column>
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
    </div>
</template>
<script>
export default {
    name: 'Controls.ChatRecord',
};
</script>
<script setup>
import { getChatRecord } from '../../api/chat-record';

const tableData = ref([]);

const params = reactive({
    pageIndex: 1,
    pageSize: 20,
    desc: true,
    keyword: '',
});
const total = ref(0);

const getData = () => {
    getChatRecord(params).then((data) => {
        tableData.value = data.items;
        total.value = data.total;
    });
};

getData();

const tableRef = ref();

const format_chatType = (row) => {
    let type;
    switch (row.chatType) {
        // Global
        case 0:
            type = '公屏';
            break;
        // Friends
        case 1:
            type = '好友';
            break;
        // Party
        case 2:
            type = '阵营';
            break;
        // Whisper
        case 3:
            type = '私聊';
            break;
        default:
            type = '未知';
    }
    return type;
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
