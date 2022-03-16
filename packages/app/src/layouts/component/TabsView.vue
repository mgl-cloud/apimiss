<template>
    <div class="card-container">
        <a-tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit">
            <a-tab-pane key="home" tab="首页" :closable="false"></a-tab-pane>
            <a-tab-pane v-for="pane in panes" :key="pane.key" :closable="pane.closable">
                <template #tab>
                    <span>
                        <android-outlined />
                        {{ pane.title }}
                    </span>
                </template>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script lang="ts" setup>
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import {
    UserOutlined, LaptopOutlined, NotificationOutlined,

    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppleOutlined,
    AndroidOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, onMounted, ref, watch } from 'vue';


const route = useRoute();
const router = useRouter();
const panes = ref<{ title: any; key: string; closable?: boolean }[]>([]);

const activeKey = ref('home')
const newTabIndex = ref(0);

const title = route.params.title || route.query.title

const addTab = () => {
    const tab = { title: title , key: route.fullPath }
    panes.value.push(tab);
}
const add = () => {
    activeKey.value = `newTab${++newTabIndex.value}`;
    addTab()
};
const remove = (targetKey: string) => {
    let lastIndex = 0;
    panes.value.forEach((pane, i) => {
        if (pane.key === targetKey) {
            lastIndex = i - 1;
        }
    });
    panes.value = panes.value.filter(pane => pane.key !== targetKey);
    if (panes.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
            activeKey.value = panes.value[lastIndex].key;
        } else {
            activeKey.value = panes.value[0].key;
        }
    }
};

const onEdit = (targetKey: string | MouseEvent, action: string) => {
    if (action === 'add') {
        add();
    } else {
        remove(targetKey as string);
    }
};


onBeforeRouteUpdate((to) => {
    console.info(to)
})


onMounted(() => {
    router.getRoutes().some(r => {
        if (r.name === route.name) {
            console.log(r.name, route.name)
        }
    });
})

</script>