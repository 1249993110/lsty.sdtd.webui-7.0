<template>
    <el-card class="teleport-friend-settings">
        <el-form :model="formModel" :rules="rules" ref="formRef" label-width="200px" status-icon>
            <el-form-item label="是否启用">
                <el-switch v-model="formModel.isEnabled" />
            </el-form-item>
            <el-form-item label="可用变量">
                <el-tooltip v-for="(item, index) in variables" :key="index" placement="bottom-start" :show-after="500" :content="item.value">
                    <el-tag class="tag">{{ item.key }}</el-tag>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="传送命令" prop="teleCmd">
                <el-input v-model="formModel.teleCmd" />
            </el-form-item>
            <el-form-item label="需要积分" prop="pointsRequired">
                <el-input v-model="formModel.pointsRequired" />
            </el-form-item>
            <el-form-item label="传送成功提示" prop="teleSucceed">
                <el-input v-model="formModel.teleSucceed" />
            </el-form-item>
            <el-form-item label="传送目标没有找到提示" prop="targetNotFound">
                <el-input v-model="formModel.targetNotFound" />
            </el-form-item>
            <el-form-item label="传送目标不是您的好友提示" prop="targetNotFriend">
                <el-input v-model="formModel.targetNotFriend" />
            </el-form-item>
            <el-form-item label="正在冷却提示" prop="teleCooling">
                <el-input v-model="formModel.teleCooling" />
            </el-form-item>
            <el-form-item label="积分不足提示" prop="pointsNotEnough">
                <el-input v-model="formModel.pointsNotEnough" />
            </el-form-item>
            <el-form-item label="传送间隔 (单位: 秒)" prop="teleInterval">
                <el-input v-model="formModel.teleInterval" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name: 'Functions.TeleportSystem.TeleportFriend.Settings',
};
</script>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import * as api from '../../../../api/teleport-friend';

const formModel = reactive({});

const formRef = ref();

const rules = {
    serverName: [{ required: true, message: '请输入传送命令', trigger: 'blur' }],
    pointsRequired: [{ required: true, message: '请输入需要积分', trigger: 'blur' }],
    teleSucceed: [{ required: true, message: '请输入传送成功提示', trigger: 'blur' }],
    targetNotFound: [{ required: true, message: '请输入传送目标没有找到提示', trigger: 'blur' }],
    targetNotFriend: [{ required: true, message: '请输入传送目标不是您的好友提示', trigger: 'blur' }],
    teleCooling: [{ required: true, message: '请输入正在冷却提示', trigger: 'blur' }],
    pointsNotEnough: [{ required: true, message: '请输入积分不足提示', trigger: 'blur' }],
    teleInterval: [{ required: true, message: '请输入传送间隔', trigger: 'blur' }],
};

api.getTeleportFriendSettings()
    .then((data) => {
        Object.assign(formModel, data);
    })
    .catch((error) => {});

const save = async () => {
    try {
        await formRef.value.validate();
        await api.editTeleportFriendSettings(formModel);
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
.teleport-friend-settings {
    height: 100%;
    .tag {
        margin-right: 8px;
    }
}
</style>
