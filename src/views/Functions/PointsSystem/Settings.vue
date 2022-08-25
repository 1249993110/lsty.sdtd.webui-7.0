<template>
    <el-card class="points-system-settings">
        <el-form :model="formModel" :rules="rules" ref="formRef" label-width="150px" status-icon>
            <el-form-item label="是否启用" prop="isEnabled">
                <el-switch v-model="formModel.isEnabled" />
            </el-form-item>
            <el-form-item label="可用变量">
                <el-tooltip v-for="(item, index) in variables" :key="index" placement="bottom-start" :show-after="500" :content="item">
                    <el-tag class="tag">{{ '{' + index + '}' }}</el-tag>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="签到命令" prop="signCmd">
                <el-input v-model="formModel.signCmd" />
            </el-form-item>
            <el-form-item label="签到间隔天数" prop="signInterval">
                <el-input v-model="formModel.signInterval" />
            </el-form-item>
            <el-form-item label="签到奖励积分" prop="rewardCount">
                <el-input v-model="formModel.rewardCount" />
            </el-form-item>
            <el-form-item label="查询积分命令" prop="queryPointsCmd">
                <el-input v-model="formModel.queryPointsCmd" />
            </el-form-item>
            <el-form-item label="签到成功提示" prop="signSucceed">
                <el-input v-model="formModel.signSucceed" />
            </el-form-item>
            <el-form-item label="签到失败提示" prop="signFail">
                <el-input v-model="formModel.signFail" />
            </el-form-item>
            <el-form-item label="查询积分" prop="queryPoints">
                <el-input v-model="formModel.queryPoints" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name: 'Functions.PointsSystem.Settings',
};
</script>

<script setup>
import { ElMessage } from 'element-plus';
import * as api from '../../../api/points-system';

const formModel = reactive({});

const formRef = ref();

const rules = {
    signCmd: [{ required: true, message: '请输入签到命令', trigger: 'blur' }],
    signInterval: [{ required: true, message: '请输入签到间隔天数', trigger: 'blur' }],
    rewardCount: [{ required: true, message: '请输入签到奖励积分', trigger: 'blur' }],
    queryPointsCmd: [{ required: true, message: '请输入查询积分命令', trigger: 'blur' }],
    signSucceed: [{ required: true, message: '请输入签到成功提示', trigger: 'blur' }],
    signFail: [{ required: true, message: '请输入签到失败提示', trigger: 'blur' }],
    queryPoints: [{ required: true, message: '请输入查询积分提示', trigger: 'blur' }],
};

api.getPointsSystemSettings()
    .then((data) => {
        Object.assign(formModel, data);
    })
    .catch((error) => {});

const save = async () => {
    try {
        await formRef.value.validate();
        await api.editPointsSystemSettings(formModel);
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
.points-system-settings {
    height: 100%;
    .tag {
        margin-right: 8px;
    }
}
</style>
