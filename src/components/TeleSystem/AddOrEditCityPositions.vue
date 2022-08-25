<template>
    <el-dialog :title="isAdd ? '新增城市' : '编辑城市'" v-model="visible" width="650px">
        <el-form ref="formRef" :model="formModel" status-icon :rules="formRules" label-width="120px" label-position="right">
            <el-form-item v-if="!isAdd" label="城市Id">
                <el-input :disabled="true" v-model="formModel.id"></el-input>
            </el-form-item>
            <el-form-item label="城市名称" prop="cityName">
                <el-input v-model="formModel.cityName"></el-input>
            </el-form-item>
            <el-form-item label="传送命令" prop="teleCommand">
                <el-input v-model="formModel.teleCommand"></el-input>
            </el-form-item>
            <el-form-item label="传送需要积分" prop="pointsRequired">
                <el-input v-model="formModel.pointsRequired"></el-input>
            </el-form-item>
            <el-form-item label="三维坐标" prop="position">
                <el-input v-model="formModel.position"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="submit">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ElMessage, ElLoading } from 'element-plus';
import * as api from '../../api/teleport-city';

const isAdd = ref(false);
const visible = ref(false);

const formModel = reactive({
    id: '',
    cityName: '',
    teleCommand: '',
    pointsRequired: 0,
    position: '',
});

const formRef = ref();

const formRules = reactive({
    cityName: [
        {
            required: true,
            trigger: 'blur',
            message: '请填写城市名称',
        },
    ],
    teleCommand: [
        {
            required: true,
            trigger: 'blur',
            message: '请填写传送命令',
        },
    ],
    pointsRequired: [
        {
            required: true,
            trigger: 'blur',
            message: '请填写传送需要积分',
        },
    ],
    position: [
        {
            required: true,
            trigger: 'blur',
            message: '请填写三维坐标',
        },
    ],
});

const submit = async () => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });

    try {
        await formRef.value.validate();

        if (isAdd.value) {
            await api.addCityPosition(formModel);
        } else {
            await api.editCityPosition(formModel);
        }

        ElMessage.success('保存成功');
        visible.value = false;
        emit('onSubmit');
    } finally {
        loading.close();
    }
};

const show = (row) => {
    visible.value = true;

    if (!row) {
        isAdd.value = true;
        formRef.value?.resetFields();
    } else {
        isAdd.value = false;
        nextTick(() => {
            Object.assign(formModel, row);
        });
    }
};

defineExpose({
    show,
});

const emit = defineEmits(['onSubmit']);
</script>
