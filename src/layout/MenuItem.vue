<template>
    <template v-for="menu in menuList" :key="menu.name">
        <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.name">
            <template #title>
                <Icon class="icon" :name="menu.icon"></Icon>
                <span>{{ menu.label }}</span>
            </template>
            <menu-item :menuList="menu.children"></menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.name">
            <Icon class="icon" :name="menu.icon"></Icon>
            <template #title>
                <span>{{ menu.label }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup>
import Icon from '../components/Icon.vue';

defineProps({
    menuList: Array,
});

</script>

<style scoped>
.icon {
    margin-right: 10px;
}
</style>
