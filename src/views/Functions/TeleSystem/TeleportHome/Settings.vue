<template>
    <el-card class="teleport-home-settings">
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
            <el-form-item label="传送间隔, 单位: 秒" prop="teleInterval" required>
                <el-input v-model="formModel.teleInterval" />
            </el-form-item>
            <el-form-item label="设置Home命令前缀" prop="setHomeCmdPrefix" required>
                <el-input v-model="formModel.setHomeCmdPrefix" />
            </el-form-item>
            <el-form-item label="最大可设置数量" prop="maxCanSetCount" required>
                <el-input v-model="formModel.maxCanSetCount" />
            </el-form-item>
            <el-form-item label="设置需要积分" prop="pointsRequiredForSet" required>
                <el-input v-model="formModel.pointsRequiredForSet" />
            </el-form-item>
            <el-form-item label="删除Home命令前缀" prop="deleteHomeCmdPrefix" required>
                <el-input v-model="formModel.deleteHomeCmdPrefix" />
            </el-form-item>
            <el-form-item label="传送Home命令前缀" prop="teleHomeCmdPrefix" required>
                <el-input v-model="formModel.teleHomeCmdPrefix" />
            </el-form-item>
            <el-form-item label="传送需要积分" prop="pointsRequiredForTele" required>
                <el-input v-model="formModel.pointsRequiredForTele" />
            </el-form-item>
             <el-form-item label="没有Home提示" prop="noneHaveHome" required>
                <el-input v-model="formModel.noneHaveHome" />
            </el-form-item>
             <el-form-item label="查询列表前置提示" prop="queryListPre" required>
                <el-input v-model="formModel.queryListPre" />
            </el-form-item>
             <el-form-item label="查询列表提示" prop="queryList" required>
                <el-input v-model="formModel.queryList" />
            </el-form-item>
             <el-form-item label="超出限制提示" prop="overLimit" required>
                <el-input v-model="formModel.overLimit" />
            </el-form-item>
             <el-form-item label="设置积分不足提示" prop="setPointsNotEnough" required>
                <el-input v-model="formModel.setPointsNotEnough" />
            </el-form-item>
            <el-form-item label="设置成功提示" prop="setSucceed" required>
                <el-input v-model="formModel.setSucceed" />
            </el-form-item>
            <el-form-item label="覆盖成功提示" prop="overwriteSucceed" required>
                <el-input v-model="formModel.overwriteSucceed" />
            </el-form-item>
            <el-form-item label="删除成功提示" prop="deleteSucceed" required>
                <el-input v-model="formModel.deleteSucceed" />
            </el-form-item>
            <el-form-item label="Home没有找到提示" prop="homeNotFound" required>
                <el-input v-model="formModel.homeNotFound" />
            </el-form-item>
            <el-form-item label="正在冷却提示" prop="teleCooling" required>
                <el-input v-model="formModel.teleCooling" />
            </el-form-item>
            <el-form-item label="传送积分不足提示" prop="telePointsNotEnough" required>
                <el-input v-model="formModel.telePointsNotEnough" />
            </el-form-item>
            <el-form-item label="传送成功提示" prop="teleSucceed" required>
                <el-input v-model="formModel.teleSucceed" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name: 'Functions.TeleportSystem.TeleportHome.Settings',
};
</script>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import * as api from '../../../../api/teleport-home';

const formModel = reactive({});

const formRef = ref();

api.getTeleportHomeSettings()
    .then((data) => {
        Object.assign(formModel, data);
    })
    .catch((error) => {});

const save = async () => {
    try {
        await formRef.value.validate();
        await api.editTeleportHomeSettings(formModel);
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
.teleport-home-settings {
    overflow: auto;
    height: 100%;
    .tag {
        margin-right: 8px;
    }
}
</style>
