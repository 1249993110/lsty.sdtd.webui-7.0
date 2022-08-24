<template>
    <div class="header">
        <div class="logo">{{ title }}</div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" class="breadcrumb-separator">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right">
            <el-color-picker v-model="color" :predefine="predefineColors" />
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    系统管理员
                    <Icon name="arrow-down"></Icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import myconfirm from '../utils/myconfirm';
import { getMenuByName } from '../utils/menus';

const title = import.meta.env.VITE_APP_TITEL;

const store = useStore();
const route = useRoute();
const router = useRouter();

const breadcrumbs = reactive([]);

const getBreadcrumbs = (result, menuName) => {
    const menu = getMenuByName(menuName);
    if (menu) {
        result.unshift(menu.label);
        if (menu.parentName) {
            getBreadcrumbs(result, menu.parentName);
        }
    }
};

getBreadcrumbs(breadcrumbs, route.name);

watch(
    () => route.name,
    (menuName) => {
        breadcrumbs.length = 0;
        getBreadcrumbs(breadcrumbs, menuName);
    }
);

const handleCommand = async (command) => {
    switch (command) {
        case 'logout':
            await myconfirm('您确定要退出登录吗?');
            keepAliveStore.activePages = [];
            router.push('/login');
            break;
    }
};

const color = ref('#00ff00');
const predefineColors = ref(['#00ff00', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', '#c71585']);
</script>

<style scoped lang="scss">
.header {
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #1f2b35;
    color: floralwhite;
    padding: 0 6px;
    .logo {
        font-weight: 700;
        font-size: 17px;
        display: flex;
    }

    .breadcrumb {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 26px;

        .breadcrumb-button {
            margin-right: 26px;
            background-color: transparent;
            border-color: transparent;
        }

        .breadcrumb-separator {
            color: floralwhite;
        }
    }

    .right {
        margin-left: auto;
        .el-dropdown {
            margin-left: 8px;
            vertical-align: middle;
            .el-dropdown-link {
                cursor: pointer;
                color: var(--el-color-primary);
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>
