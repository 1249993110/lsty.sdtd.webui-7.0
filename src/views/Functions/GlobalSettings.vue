<template>
    <el-card class="global-settings">
        <el-form :model="formModel" :rules="rules" ref="formRef" label-width="150px">
            <!-- <el-form-item label="是否启用">
                <el-switch v-model="formModel.isEnabled" />
            </el-form-item> -->
            <el-form-item label="服务器名称" prop="serverName">
                <el-input v-model="formModel.serverName" />
            </el-form-item>
            <el-form-item label="聊天命令前缀" prop="chatCommandPrefix">
                <el-input v-model="formModel.chatCommandPrefix" />
            </el-form-item>
            <el-form-item label="聊天消息错误提示" prop="handleChatMessageError">
                <el-input v-model="formModel.handleChatMessageError" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name: 'Functions.GlobalSettings',
};
</script>

<script setup>
import { ElMessage } from 'element-plus';
import { updateGlobalSettings, getGlobalSettings } from '../../api/global-settings';

const formModel = reactive({
    serverName: '',
    chatCommandPrefix: '',
    handleChatMessageError: '',
});

const formRef = ref();

const rules = {
    serverName: [{ required: true, message: '请输入服务器名称', trigger: 'blur' }],
    handleChatMessageError: [{ required: true, message: '请输入聊天消息错误提示', trigger: 'blur' }],
};

getGlobalSettings()
    .then((data) => {
        Object.assign(formModel, data);
    })
    .catch((error) => {});

const save = async () => {
    try {
        await formRef.value.validate();
        await updateGlobalSettings(formModel);
        ElMessage.success('保存成功');
    } catch {}
};
</script>

<style scoped lang="scss">
.global-settings {
    height: 100%;
}
</style>
