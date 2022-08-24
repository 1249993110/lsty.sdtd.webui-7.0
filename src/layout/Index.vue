<template>
    <el-container>
        <el-header height="48px" style="box-shadow: 0 1px 4px rgb(0 21 41 / 8%)">
            <Header></Header>
        </el-header>
        <el-container style="height: calc(100% - 48px)">
            <el-aside width="210px">
                <Sidebar></Sidebar>
            </el-aside>
            <el-container>
                <el-main>
                    <Main></Main>
                    <div class="router-view-container">
                        <router-view v-slot="{ Component }">
                            <transition mode="out-in">
                                <keep-alive :include="includes">
                                    <component :is="Component" />
                                </keep-alive>
                            </transition>
                        </router-view>
                    </div>
                </el-main>
                <el-footer height="48px">
                    <Footer></Footer>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
import Main from './Main.vue';
import Footer from './Footer.vue';
import { useKeepAliveStore } from '../store/keep-alive';

const keepAliveStore = useKeepAliveStore();
const includes = computed(() => keepAliveStore.includes);
</script>

<style scoped>
.el-container {
    height: 100%;
}

.el-header {
    padding: 0;
}

.el-main {
    --el-main-padding: 6px;
}

.router-view-container {
    height: calc(100% - 56px);
}
</style>
