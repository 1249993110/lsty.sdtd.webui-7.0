<template>
    <el-container>
        <el-header height="48px" style="box-shadow: 0 1px 4px rgb(0 21 41 / 8%)">
            <Header></Header>
        </el-header>
        <el-container style="height: calc(100% - 48px)">
            <el-aside>
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-main>
                    <Main></Main>
                    <div class="router-view">
                        <router-view v-slot="{ Component }">
                            <transition mode="out-in">
                                <keep-alive :include="keepAlive">
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
import Aside from './Aside.vue';
import Header from './Header.vue';
import Main from './Main.vue';
import Footer from './Footer.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const keepAlive = computed(() => {
    return store.getters['getActivePages'];
});
</script>

<style scoped>
.el-container {
    height: 100%;
}

.el-header {
    padding: 0;
}

.el-aside {
    width: 210px;
}

.el-main {
    --el-main-padding: 6px;
}

.router-view {
    height: calc(100% - 56px);
}
</style>
