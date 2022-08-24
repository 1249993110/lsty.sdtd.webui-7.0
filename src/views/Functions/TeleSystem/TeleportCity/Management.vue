<template>
    <div class="teleport-city-management">
        <div class="operate-container">
            <el-button type="primary" :icon="Plus" @click="handleAdd">新建</el-button>
            <div class="search-container">
                <el-input class="input" v-model="params.keyword" placeholder clearable @keyup.enter.native="getData"></el-input>
                <el-button class="button" type="primary" @click="getData">
                    <template #icon><Icon name="search" /></template>
                    查 询
                </el-button>
            </div>
        </div>
        <el-table class="table-container" :data="tableData" border height="calc(100% - 84px)" highlight-current-row ref="tableRef">
            <el-table-column type="index" label="序号" width="60"> </el-table-column>
            <el-table-column prop="createdDate" label="创建日期" sortable> </el-table-column>
            <el-table-column prop="cityName" label="城镇名称" sortable> </el-table-column>
            <el-table-column prop="teleCommand" label="传送命令" sortable> </el-table-column>
            <el-table-column prop="pointsRequired" label="传送需要积分" sortable> </el-table-column>
            <el-table-column prop="position" label="三维坐标" sortable> </el-table-column>
            <el-table-column label="操作" width="200" header-align="center" show-overflow-tooltip>
                <template #default="scope">
                    <el-button size="small" type="primary" :icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" :icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
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
        <AddOrEditCityPositions ref="addOrEditCityPositionsRef" @onSubmit="getData" />
    </div>
</template>

<script>
export default {
    name: 'Functions.TeleportSystem.TeleportCity.Management',
};
</script>

<script setup>
import { ref, reactive } from 'vue';
import * as api from '../../../../api/teleport-city';
import { Edit, Plus, Delete, Search, Refresh, FolderAdd } from '@element-plus/icons-vue';
import AddOrEditCityPositions from '../../../../components/TeleSystem/AddOrEditCityPositions.vue';
import myconfirm from '../../../../utils/myconfirm';

const tableData = ref([]);

const params = reactive({
    pageIndex: 1,
    pageSize: 10,
    desc: true,
    keyword: '',
});
const total = ref(0);

const getData = () => {
    api.getCityPositionPaged(params).then((data) => {
        tableData.value = data.items;
        total.value = data.total;
    });
};

getData();

const tableRef = ref();
const addOrEditCityPositionsRef = ref();

const handleAdd = () => {
    addOrEditCityPositionsRef.value.show();
};

const handleEdit = (row) => {
    addOrEditCityPositionsRef.value.show(row);
};

const handleDelete = async (row) => {
    try {
        await myconfirm('确定删除选中内容吗?');
        await api.deleteCityPositionById(row.id);
        getData();
    } catch {}
};
</script>

<style scoped lang="scss">
.teleport-city-management {
    height: 100%;
    .operate-container {
        display: flex;
        padding: 0 8px;
        .search-container {
            margin-left: auto;
            display: flex;
            .input {
                width: 400px;
            }
            .button {
                margin-left: 8px;
            }
        }
    }

    .table-container {
        margin-top: 8px;
    }
}
</style>
