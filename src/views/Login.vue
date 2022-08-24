<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-box-title">
                <span>天依七日杀后台管理系统</span>
            </div>
            <el-form :model="formModel" :rules="rules" ref="loginRef" label-width="0px" class="login-box-content">
                <el-form-item prop="userName">
                    <el-input disabled v-model="formModel.userName">
                        <template #prepend>
                            <el-button :icon="User"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="accessToken">
                    <el-input type="password" placeholder="AccessToken" v-model="formModel.accessToken" @keyup.enter="submitForm">
                        <template #prepend>
                            <el-button :icon="Lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登 录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ElMessage as message } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import { signIn } from '../api/account';
import { useUserInfoStore } from '../store/user-info';

const router = useRouter();
const userInfoStore = useUserInfoStore();

const formModel = reactive({
    userName: '系统管理员',
    accessToken: '',
});
const rules = {
    accessToken: [{ required: true, message: '请输入AccessToken', trigger: 'blur' }],
};

const loginRef = ref();
const submitForm = async () => {
    await loginRef.value.validate();
    try {
        userInfoStore.setAccessToken(formModel.accessToken);
        await signIn();
        message.success('登录成功');
        router.push('/home');
    } catch {
        message.error('登录失败');
    }
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(45, 58, 75);
}

.login-box {
    width: 360px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    margin-bottom: 8vh;
}

.login-box-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(238, 238, 238);
    border-bottom: 1px solid #ddd;
    position: relative;
}

.login-box-content {
    padding: 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>
