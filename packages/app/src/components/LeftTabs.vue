<template>
    <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        :style="{ background: '#fff', margin: 0 }"
        width="300px"
        class="left-tabs"
    >
        <a-page-header
            title="Title"
            class="site-page-header"
            style="border-bottom: 1px solid rgb(235, 237, 240)"
            sub-title="This is a subtitle"
            :avatar="{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }"
        >
            <template #tags>
                <a-tag color="blue">Running</a-tag>
            </template>
        </a-page-header>
        <a-tabs v-model:activeKey="activeKey" tab-position="left">
            <a-tab-pane key="1" active>
                <template #tab>
                    <span>
                        <apple-outlined />
                        <div>合集</div>
                    </span>
                </template>
            </a-tab-pane>
            <a-tab-pane key="2" class="left-tabs">
                <template #tab>
                    <span>
                        <android-outlined />
                        <div>合集</div>
                    </span>
                </template>

                <a-input-search style="margin-bottom: 8px" placeholder="Search">
                    <template #addonBefore>
                        <a href="#">
                            <FolderAddOutlined />
                        </a>
                    </template>
                    <template #addonAfter>
                        <a-dropdown :trigger="['click']">
                            <a href="#">
                                <EllipsisOutlined />
                            </a>
                            <template #overlay>
                                <a-menu
                                    @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)"
                                >
                                    <a-menu-item key="1">
                                        <folder-add-outlined />新增文件夹
                                    </a-menu-item>
                                    <a-menu-item key="2">
                                        <file-add-outlined />新增请求
                                    </a-menu-item>
                                    <a-menu-item key="3">
                                        <delete-outlined />删除
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                </a-input-search>
                <el-tree
                    :data="dataSource"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    @node-click="onSelect"
                >
                    <template #default="{ node, data }">
                        <span class="custom-tree-node">
                            <span>{{ node.label }}</span>
                            <!-- <span>
                                <a @click="append(data)">Append</a>
                                <a @click="remove(node, data)">Delete</a>
                            </span>-->
                            <span class="more">
                                <a-dropdown :trigger="['click']">
                                    <EllipsisOutlined />
                                    <template #overlay>
                                        <a-menu
                                            @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)"
                                        >
                                            <a-menu-item key="1">
                                                <folder-add-outlined />新增文件夹
                                            </a-menu-item>
                                            <a-menu-item key="2">
                                                <file-add-outlined />新增请求
                                            </a-menu-item>
                                            <a-menu-item key="3">
                                                <delete-outlined />删除
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </span>
                        </span>
                    </template>
                </el-tree>
            </a-tab-pane>
        </a-tabs>
    </a-layout-sider>
</template>

<script setup lang="ts">
import { ElButton, ElTree } from 'element-plus'
import 'element-plus/es/components/tree/style/css'
import type Node from 'element-plus/es/components/tree/src/model/node'
import {
    UserOutlined, LaptopOutlined, NotificationOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppleOutlined,
    AndroidOutlined,
    DownOutlined,
    MoreOutlined,
    FolderAddOutlined,
    EllipsisOutlined,
    FileAddOutlined,
    DeleteOutlined

} from '@ant-design/icons-vue';

import { useRoute, useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue';

const route = useRoute()
const router = useRouter()

const collapsed = ref<boolean>(false), activeKey = ref('2')

interface Tree {
    id: number
    label: string
    children?: Tree[]
}
let id = 1000


const append = (data: Tree) => {
    const newChild = { id: id++, label: 'testtest', children: [] }
    if (!data.children) {
        data.children = []
    }
    data.children.push(newChild)
    dataSource.value = [...dataSource.value]
}

const remove = (node: Node, data: Tree) => {
    const parent = node.parent
    const children: Tree[] = parent.data.children || parent.data
    const index = children.findIndex((d) => d.id === data.id)
    children.splice(index, 1)
    dataSource.value = [...dataSource.value]
}

const onSelect = (node: any) => {
    console.log(node);
    router.push({
        name: "collections",
        // preserve current path and remove the first char to avoid the target URL starting with `//`
        params: { id: node.id,label: node.label },
        // preserve existing query and hash if any
    }).catch(() => { });
}

const onContextMenuClick = () => {
    router.push("/collections").catch(() => { });
}

const onMouseLeave = (e) => {
    console.log(e.target);
    e.target.classList.remove('current')
}


const onMouseOver = (e) => {
    e.target.classList.remove('current')
}

const dataSource = ref<Tree[]>([
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 4,
                label: 'Level two 1-1',
                children: [
                    {
                        id: 9,
                        label: 'Level three 1-1-1',
                    },
                    {
                        id: 10,
                        label: 'Level three 1-1-2',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            {
                id: 5,
                label: 'Level two 2-1',
            },
            {
                id: 6,
                label: 'Level two 2-2',
            },
        ],
    },
    {
        id: 3,
        label: 'Level one 3',
        children: [
            {
                id: 7,
                label: 'Level two 3-1',
            },
            {
                id: 8,
                label: 'Level two 3-2',
            },
        ],
    },
])

</script>
<style lang="scss">
/* .tree-more {
    position: absolute;
    right: 10px;
} */

.left-tabs .ant-tabs-left-content {
    padding: 0 !important;
}

.ant-tree-directory {
    /* .ant-tree-treenode-switcher-open::before {
        width: 1px;
        border-left: 1px solid #d9d9d9;
        content: " ";
        padding: 9px 3px;
    }

    .ant-tree-child-tree {
        li {
        }

        li::before {
            width: 1px;
            border-left: 1px solid #d9d9d9;
            content: " ";
            padding: 9px 3px;
        }
    } */
}

.left-tabs {
    .ant-dropdown-button {
        margin-right: 8px;
        margin-bottom: 8px;
    }

    .more {
        position: absolute;
        right: 10px;
    }

    .current {
        .more {
            display: block !important;
        }
    }

    .ant-input-group {
        border-bottom: 1px solid #d9d9d98c;
        * {
            border: none;
        }
    }
}
</style>