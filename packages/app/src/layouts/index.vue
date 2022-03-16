<template>
    <a-layout v-if="design === 'd2'">
        <a-layout-header class="header">
            <div class="logo" />
            <a-menu
                v-model:selectedKeys="selectedKeys1"
                theme="dark"
                mode="horizontal"
                :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1">nav 1</a-menu-item>
                <a-menu-item key="2">nav 2</a-menu-item>
                <a-menu-item key="3">nav 3</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout>
            <LeftTabs />
            <a-layout style="padding: 0px 1px 0px">
                <a-breadcrumb style="margin: 16px">
                    <a-breadcrumb-item>Home</a-breadcrumb-item>
                    <a-breadcrumb-item>List</a-breadcrumb-item>
                    <a-breadcrumb-item>App</a-breadcrumb-item>
                </a-breadcrumb>

                <a-layout-content
                    :style="{ background: '#fff', padding: '0', margin: 0, minHeight: '280px' }"
                >
                    <TabsView />
                    <el-scrollbar
                        class="layout-scrollbar"
                        ref="layoutScrollbarRef"
                        :style="{ transition: 'padding 0.3s ease-in-out' }"
                    >

                    <slot></slot>
                       <router-view v-slot="{ Component }">
                            <transition :name="setTransitionName" mode="out-in">
                                <keep-alive :include="keepAliveNameList">
                                    <component
                                        :is="Component"
                                        :key="refreshRouterViewKey"
                                        class="w100"
                                        :style="{ minHeight: '10px' }"
                                    />
                                </keep-alive>
                            </transition>
                        </router-view>
                    </el-scrollbar>
                </a-layout-content>
            </a-layout>
        </a-layout>
        <a-layout-footer>Footer</a-layout-footer>
    </a-layout>

    <a-layout v-if="design === 'd1'">
        <a-layout-header>Header</a-layout-header>
        <a-layout>
            <a-layout-content>Content</a-layout-content>
            <a-layout-sider>Sider</a-layout-sider>
        </a-layout>
        <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
</template>

<script lang="ts" setup name="default">
import {
    UserOutlined, LaptopOutlined, NotificationOutlined,

    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppleOutlined,
    AndroidOutlined,
} from '@ant-design/icons-vue';
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue';
import { ElScrollbar } from 'element-plus';

import LeftTabs from '../components/LeftTabs.vue'
import TabsView from './component/TabsView.vue'
import { useStore } from '../store/index';
import { useRoute } from 'vue-router'
const store = useStore();
const route = useRoute();
defineProps({
    design: {
        type: String,
        default: "d2"
    }
})

const selectedKeys = ref<string[]>(['2']),
    selectedKeys1 = ref<string[]>(['2']),
    selectedKeys2 = ref<string[]>(['1']),
    collapsed = ref<boolean>(false),
    openKeys = ref<string[]>(['sub1'])

// 定义接口来定义对象的类型
interface ParentViewState {
    refreshRouterViewKey: null | string;
    keepAliveNameList: string[];
}
const state = reactive<ParentViewState>({
    refreshRouterViewKey: null,
    keepAliveNameList: [],
});

// 获取布局配置信息
const getThemeConfig = computed(() => {
    return store.state.themeConfig.themeConfig;
});

// 设置主界面切换动画
const setTransitionName = computed(() => {
    return store.state.themeConfig.themeConfig.animation;
});

const { refreshRouterViewKey, keepAliveNameList } = toRefs(state)

watch(route, (src, to) => {
    console.info(src, to)
})

</script>

<style lang="scss" scoped>
.card-container p {
    margin: 0;
}
.card-container > .ant-tabs-card .ant-tabs-content {
    height: 120px;
    margin-top: -16px;
}
.card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    padding: 16px;
    background: #fff;
}
.card-container > .ant-tabs-card > .ant-tabs-nav::before {
    display: none;
}
.card-container > .ant-tabs-card .ant-tabs-tab,
[data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
}
.card-container > .ant-tabs-card .ant-tabs-tab-active,
[data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-tab-active {
    background: #fff;
    border-color: #fff;
}
#components-tabs-demo-card-top .code-box-demo {
    padding: 24px;
    overflow: hidden;
    background: #f5f5f5;
}
[data-theme="compact"] .card-container > .ant-tabs-card .ant-tabs-content {
    height: 120px;
    margin-top: -8px;
}
[data-theme="dark"] .card-container > .ant-tabs-card .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
}
[data-theme="dark"] #components-tabs-demo-card-top .code-box-demo {
    background: #000;
}
[data-theme="dark"]
    .card-container
    > .ant-tabs-card
    .ant-tabs-content
    > .ant-tabs-tabpane {
    background: #141414;
}
[data-theme="dark"] .card-container > .ant-tabs-card .ant-tabs-tab-active {
    background: #141414;
    border-color: #141414;
}
</style>