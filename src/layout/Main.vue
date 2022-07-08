<template>
    <el-tabs closable v-model="selectedTab" type="card" @tab-remove="removeTab">
        <el-tab-pane v-for="(item, index) in tabs" :key="index" :name="item.name">
            <template #label>
                <Icon class="icon" :name="item.icon"></Icon>
                <span>{{ item.label }}</span>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { getMenuByName } from '../utils/menus';

const store = useStore();
const route = useRoute();
const router = useRouter();

const selectedTab = computed({
    get: () => route.name,
    set: (name) => router.push({ name: name }),
});

const tabs = computed(() => {
    const pages = store.getters['getActivePages'];
    const result = [];
    pages.forEach((i) => {
        const menu = getMenuByName(i);
        result.push({
            name: menu.name,
            label: menu.label,
            icon: menu.icon,
        });
    });
    return result;
});

const removeTab = (name) => {
    store.commit('removeActivePage', name);
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
