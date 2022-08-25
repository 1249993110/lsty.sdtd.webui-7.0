<template>
    <template v-for="(menu,index) in items" :key="index">
        <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.path || index.toString()">
            <template #title>
                <Icon class="menu-icon" :name="menu.icon"></Icon>
                <span>{{ menu.label }}</span>
            </template>
            <MenuTree :items="menu.children"></MenuTree>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.path">
            <Icon class="menu-icon" :name="menu.icon"></Icon>
            <template #title>
                <span>{{ menu.label }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup>

defineProps({
    items: Array,
});

</script>

<style scoped>
.menu-icon {
    margin-right: 10px;
}
</style>
