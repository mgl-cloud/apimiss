import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
/* import * as Icons from '@element-plus/icons-vue';
import 'element-plus/es/components/icon/style/css' */
import { store, key } from './store';
import router from './router/index'

import mitt from 'mitt';

const app = createApp(App)

// 全局使用图标，遍历引入
/* const icons = Icons
for (const i in icons) {
  app.component(i, icons[i])
} */


app.config.globalProperties.mittBus = mitt();

app.use(Antd).use(store,key).use(router).mount('#app')




