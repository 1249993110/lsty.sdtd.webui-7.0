<template>
    <el-dialog :title="isAdd ? '新增Home' : '编辑Home'" v-model="visible" width="650px">
        <el-form ref="formRef" :model="formModel" status-icon :rules="formRules" label-width="120px" label-position="right">
            <el-form-item v-if="!isAdd" label="HomeId">
                <el-input :disabled="true" v-model="formModel.id"></el-input>
            </el-form-item>
            <el-form-item v-if="!isAdd" label="玩家名称">
                <el-input :disabled="true" v-model="formModel.playerName"></el-input>
            </el-form-item>
            <el-form-item label="实体Id" prop="entityId">
                <el-input :disabled="true" v-model="formModel.entityId"></el-input>
            </el-form-item>
            <el-form-item label="Home名称" prop="homeName">
                <el-input v-model="formModel.homeName"></el-input>
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
import * as api from '../../api/teleport-home';

const isAdd = ref(false);
const visible = ref(false);

const formModel = reactive({
    id: '',
    playerName: '',
    entityId: 0,
    homeName: '',
    position: '',
});

const formRef = ref();

const formRules = reactive({
    entityId: [
        {
            required: true,
            trigger: 'blur',
            message: '请填写实体Id',
        },
    ],
    homeName: [
        {
            required: true,
            trigger: 'blur',
            message: '请填写Home名称',
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
            await api.addHomePosition(formModel);
        } else {
            await api.updateHomePosition(formModel);
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
