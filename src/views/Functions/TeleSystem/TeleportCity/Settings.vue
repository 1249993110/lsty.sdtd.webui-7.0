<template>
    <el-card class="teleport-city-settings">
        <el-form :model="formModel" :rules="rules" ref="formRef" label-width="150px" status-icon>
            <el-form-item label="是否启用" prop="isEnabled">
                <el-switch v-model="formModel.isEnabled" />
            </el-form-item>
            <el-form-item label="可用变量">
                <el-tooltip v-for="(item, index) in variables" :key="index" placement="bottom-start" :show-after="500" :content="item.value">
                    <el-tag class="tag">{{ item.key }}</el-tag>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="查询列表命令" prop="queryListCmd">
                <el-input v-model="formModel.queryListCmd" />
            </el-form-item>
            <el-form-item label="传送间隔, 单位: 秒" prop="teleInterval">
                <el-input v-model="formModel.teleInterval" />
            </el-form-item>
            <el-form-item label="查询列表前置提示" prop="queryListPre">
                <el-input v-model="formModel.queryListPre" />
            </el-form-item>
            <el-form-item label="查询列表提示" prop="queryList">
                <el-input v-model="formModel.queryList" />
            </el-form-item>
            <el-form-item label="传送成功提示" prop="teleSucceed">
                <el-input v-model="formModel.teleSucceed" />
            </el-form-item>
            <el-form-item label="积分不足提示" prop="pointsNotEnough">
                <el-input v-model="formModel.pointsNotEnough" />
            </el-form-item>
            <el-form-item label="正在冷却提示" prop="teleCooling">
                <el-input v-model="formModel.teleCooling" />
            </el-form-item>
            <el-form-item label="无城市信息提示" prop="noneCity">
                <el-input v-model="formModel.noneCity" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name: 'teleport-city-settings',
};
</script>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import * as api from '../../../../api/teleport-city';

const formModel = reactive({});

const formRef = ref();

const rules = {
    queryListCmd: [{ required: true, message: '请输入查询列表命令', trigger: 'blur' }],
    teleInterval: [{ required: true, message: '请输入传送间隔', trigger: 'blur' }],
    queryListPre: [{ required: true, message: '请输入查询列表前置提示', trigger: 'blur' }],
    queryList: [{ required: true, message: '请输入查询列表提示', trigger: 'blur' }],
    teleSucceed: [{ required: true, message: '请输入传送成功提示', trigger: 'blur' }],
    pointsNotEnough: [{ required: true, message: '请输入积分不足提示', trigger: 'blur' }],
    teleCooling: [{ required: true, message: '请输入正在冷却提示', trigger: 'blur' }],
    noneCity: [{ required: true, message: '请输入无城市信息提示', trigger: 'blur' }],
};

api.getTeleportCitySettings()
    .then((data) => {
        Object.assign(formModel, data);
    })
    .catch((error) => {});

const save = async () => {
    try {
        await formRef.value.validate();
        await api.editTeleportCitySettings(formModel);
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
.teleport-city-settings {
    height: 100%;
    .tag {
        margin-right: 8px;
    }
}
</style>
