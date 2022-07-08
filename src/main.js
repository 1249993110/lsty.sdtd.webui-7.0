import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'normalize.css';
import './assets/styles/common.scss';
import './assets/iconfont/iconfont';
import Icon from './components/Icon.vue';
import Router from './router';
import Store from './store';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import './lib/signalR';

const app = createApp(App);
app.use(ElementPlus, { locale });
app.use(Router);
app.use(Store);
app.component('Icon', Icon);
app.mount('#app');
