<template>
    <el-tabs closable v-model="selectedTab" type="card" @tab-remove="handleRemoveTab">
        <el-tab-pane v-for="item in tabs" :key="item.path" :name="item.path">
            <template #label>
                <Icon class="icon" :name="item.icon"></Icon>
                <span>{{ item.label }}</span>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { useKeepAliveStore } from '../store/keep-alive';
import { useMenusStore } from '../store/menus';

const keepAliveStore = useKeepAliveStore();
const route = useRoute();
const router = useRouter();
const menusStore = useMenusStore();

const selectedTab = computed({
    get: () => route.path,
    set: (path) => router.push(path),
});

const tabs = computed(() => {
    const result = [];
    keepAliveStore.paths.forEach((path) => {
        const menu = menusStore.getMenuByPath(path);
        if(menu){
            result.push(menu);
        }
    });
    
    return result;
});

const handleRemoveTab = (path) => {
    keepAliveStore.removePage(path);
};
</script>

<style scoped>
.icon {
    margin-right: 6px;
}
:deep(.el-tabs__nav .el-tabs__item:nth-child(1) i) {
    display: none;
}
</style>
