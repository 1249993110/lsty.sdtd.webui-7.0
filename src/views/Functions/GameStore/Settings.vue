<template>
    <el-card class="game-store-settings">
        <el-form :model="formModel" ref="formRef" label-width="150px" status-icon>
            <el-form-item label="是否启用" prop="isEnabled">
                <el-switch v-model="formModel.isEnabled" />
            </el-form-item>
            <el-form-item label="可用变量">
                <el-tooltip v-for="(item, index) in variables" :key="index" placement="bottom-start" :show-after="500" :content="item.value">
                    <el-tag class="tag">{{ item.key }}</el-tag>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="查询列表命令" prop="queryListCmd" required>
                <el-input v-model="formModel.queryListCmd" />
            </el-form-item>
            <el-form-item label="查询列表前置提示" prop="queryListPre" required>
                <el-input v-model="formModel.queryListPre" />
            </el-form-item>
            <el-form-item label="查询列表提示" prop="queryList" required>
                <el-input v-model="formModel.queryList" />
            </el-form-item>
            <el-form-item label="购买成功提示" prop="buySuccessfully" required>
                <el-input v-model="formModel.buySuccessfully" />
            </el-form-item>
            <el-form-item label="积分不足提示" prop="pointsNotEnough" required>
                <el-input v-model="formModel.pointsNotEnough" />
            </el-form-item>
            <el-form-item label="没有商品信息提示" prop="noneGoods" required>
                <el-input v-model="formModel.noneGoods" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name: 'game-store-settings',
};
</script>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import * as api from '../../../api/game-store';

const formModel = reactive({});

const formRef = ref();

api.getGameStoreSettings()
    .then((data) => {
        Object.assign(formModel, data);
    })
    .catch((error) => {});

const save = async () => {
    try {
        await formRef.value.validate();
        await api.editGameStoreSettings(formModel);
        ElMessage.success('保存成功');
    } catch {}
};

const variables = ref([]);
api.getVariables()
    .then((data) => {
        variables.value = data;
    })
    .catch((error) => {});
</script>

<style scoped lang="scss">
.game-store-settings {
    height: 100%;
    .tag {
        margin-right: 8px;
    }
}
</style>
