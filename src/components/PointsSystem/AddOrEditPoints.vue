<template>
    <el-dialog :title="isAdd ? '新增积分' : '编辑积分'" v-model="visible" width="650px">
        <el-form ref="formRef" :model="formModel" status-icon :rules="formRules" label-width="120px" label-position="right">
            <el-form-item v-if="!isAdd" label="玩家名称">
                <el-input :disabled="true" v-model="formModel.playerName"></el-input>
            </el-form-item>
            <el-form-item label="实体Id" prop="entityId">
                <el-input :disabled="true" v-model="formModel.entityId"></el-input>
            </el-form-item>
            <el-form-item label="积分数量" prop="count">
                <el-input v-model="formModel.count"></el-input>
            </el-form-item>
            <el-form-item label="上次签到日期" prop="lastSignDay">
                <el-input v-model="formModel.lastSignDay"></el-input>
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
import * as api from '../../api/points-system';

const isAdd = ref(false);
const visible = ref(false);

const formModel = reactive({
    playerName: '',
    entityId: 0,
    count: 0,
    lastSignDay: 0,
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
    count: [
        {
            required: true,
            trigger: 'blur',
            message: '请填写积分数量',
        },
    ],
    lastSignDay: [
        {
            required: true,
            trigger: 'blur',
            message: '请填写上次签到日期',
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
            await api.addPoints(formModel);
        } else {
            await api.updatePoints(formModel);
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
