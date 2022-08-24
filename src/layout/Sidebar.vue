<template>
    <div class="aside">
        <el-menu
            class="menu"
            :default-active="selectedMenu"
            @select="handleSelectMenu"
            background-color="#001529"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <MenuTree :items="items"></MenuTree>
        </el-menu>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import MenuItem from './MenuItem.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { menus, getMenuByName } from '../utils/menus';

const store = useStore();
const route = useRoute();

const selectedMenu = computed(() => {
    return route.name;
});

const items = menus;

const handleSelectMenu = (menuName) => {
    const menu = getMenuByName(menuName);
    if (menu.isExternalLink) {
        window.open(menu.url);
    } else {
        store.commit('addActivePage', menuName);
    }
};
</script>

<style scoped lang="scss">
.aside {
    height: 100%;
    .menu {
        min-height: 100%;
    }
}
</style>
