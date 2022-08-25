<template>
    <div class="sidebar">
        <el-menu
            class="menu"
            :default-active="activeMenu"
            @select="handleSelectMenu"
            background-color="#001529"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
        >
            <MenuTree :items="items"></MenuTree>
        </el-menu>
    </div>
</template>


<script setup>
import { useMenusStore } from '../store/menus';
import { useKeepAliveStore } from '../store/keep-alive';

const route = useRoute();
const menusStore = useMenusStore();
const keepAliveStore = useKeepAliveStore();

const activeMenu = computed(() => route.path);

const items = computed(() => menusStore.tree);

const handleSelectMenu = (path) => {
    const menu = menusStore.getMenuByPath(path);
    if (menu.isExternalLink) {
        window.open(menu.path);
    } else {
        keepAliveStore.addPage(path);
    }
};
</script>

<style scoped lang="scss">
.sidebar {
    height: 100%;
    .menu {
        min-height: 100%;
    }
}
</style>
