<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed, getCurrentInstance, reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '/@/store/index';
import other from '/@/utils/other';
import Layouts from './layouts/index.vue';

// 获取布局配置信息
const getThemeConfig = computed(() => {
  return store.state.themeConfig.themeConfig;
});
const route = useRoute();
const store = useStore();


const state = reactive({
  i18nLocale: null,
});
const { proxy } = <any>getCurrentInstance();

const { i18nLocale } = toRefs(state)


/* proxy.mittBus.on('getI18nConfig', (locale: string) => {
  (state.i18nLocale as string | null) = locale;
}); */


// 监听路由的变化，设置网站标题
		watch(
			() => route.path,
			() => {
				other.useTitle();
			}
		);

</script>

<template>
    <router-view  />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app > .ant-layout {
  height: 100vh;
}
</style>
