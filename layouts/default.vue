<script lang="ts" setup>
import { useDraggable } from 'vue-draggable-plus'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

const selectedKeys = ref<string[]>(['1'])
const [collapsed] = useToggle()

const tabList = ref([
  { id: 1, label: '首页' },
  { id: 2, label: '系统管理' },
  { id: 3, label: '菜单管理' },
])
const tabListRef = ref<HTMLElement>()
useDraggable(tabListRef, tabList, {
  animation: 150,
  dragClass: 'tabs-sortable-drag',
})

const activeTab = ref(3)
function onTab(id: number) {
  activeTab.value = id
}

function siderTrigger() {
  return h(
    'div',
    {
      class: 'sider-trigger-container',
      style: {
        background: '#fff3f3',
        color: 'rgba(0, 0, 0, 0.88)',
        fontSize: '18px',
      },
    },
    {
      default: () => [
        collapsed.value
          ? h(MenuUnfoldOutlined, { class: 'sider-trigger' })
          : h(MenuFoldOutlined, { class: 'sider-trigger' }),
      ],
    },
  )
}
</script>

<template>
  <a-layout id="classic-layout" flex-row min-h="100vh" min-w="200">
    <a-layout-sider v-model:collapsed="collapsed" collapsible bg="#ffffff" :trigger="siderTrigger()">
      <div h-15 flex-center gap-1>
        <img src="/nuxt.svg" alt="log" h-8 w-8>
        <h2 v-if="!collapsed" color="var(--site-text-color)" whitespace-nowrap text-5 font-700>
          Nigi Pro
        </h2>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" border-0>
        <a-menu-item key="1">
          <UserOutlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <VideoCameraOutlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <UploadOutlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header bg="#ffffff" h-15 flex-y-center justify-between px-4>
        <div w="7/10">
          <div ref="tabListRef" class="tab-list">
            <div
              v-for="tab in tabList"
              :key="tab.id"
              class="tab-item"
              :class="activeTab === tab.id ? 'tab-selected' : 'not-selected'"
              @click="onTab(tab.id)"
            >
              <div z-2 leading-38px>
                <UserOutlined class="tab-icon" />
                {{ tab.label }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div flex-center gap-2>
            <div text-base font-450>
              Nigi Wen
            </div>
            <a-avatar bg="#1677FF" size="large">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content bg="#ffffff" m="t-6 x-4 b-0" min-h-70 p-6>
        <slot />
      </a-layout-content>
      <a-layout-footer p-x-12 p-y-3 text-center>
        Nigi Pro ©2024 Created by wen403
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
#classic-layout {
  // 菜单缩放按钮
  .sider-trigger-container {
    &:hover .sider-trigger {
      color: #1890ff;
    }
    .sider-trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }
  }

  // 页签
  .tab-list {
    $tab-height: 38px;
    $active-color: #e6f4ff;
    $default-color: #ffffff;

    display: flex;
    position: relative;
    z-index: 2;
    border-radius: 12px 12px 0 0;
    background-color: $default-color;
    overflow: hidden;
    transform: translateY(11px);

    // 页签样式
    .tab-item {
      padding: 0 20px;
      min-width: 100px;
      height: $tab-height;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;

      &:last-child {
        &.tab-selected {
          box-shadow:
            0 0 0 0,
            -19px 14px 0 0 $active-color;
        }

        &:after {
          display: none;
        }
      }

      &:first-child {
        &.tab-selected {
          box-shadow:
            19px 14px 0 0 $active-color,
            0 0 0 0;
        }

        &:before {
          display: none;
        }
      }
    }

    // 选中的页签样式
    .tab-selected {
      z-index: -1;
      opacity: 1;
      background: $active-color;
      border-radius: 12px 12px 0 0;
      color: #1677ff;
      box-shadow:
        19px 14px 0 $active-color,
        -19px 14px 0 0 $active-color;

      &::before {
        content: '';
        position: absolute;
        left: -6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        border-top-left-radius: 12px;
        background-color: $active-color;
        transform: skewX(-15deg);
      }

      &::after {
        content: '';
        position: absolute;
        right: -6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        border-top-right-radius: 12px;
        background-color: $active-color;
        transform: skewX(15deg);
      }
    }

    // 未选中的页签样式
    .not-selected {
      color: #a0a0a0;
      &::before {
        content: '';
        position: absolute;
        left: 6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        background: $default-color;
        border-bottom-left-radius: 12px;
        transform: skewX(15deg);
      }

      &::after {
        content: '';
        position: absolute;
        right: 6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        background: $default-color;
        border-bottom-right-radius: 12px;
        transform: skewX(-15deg);
        z-index: 1;
      }
    }

    // 拖拽出来的页签样式
    .tabs-sortable-drag {
      background-color: #ffffff !important;
      border-radius: 6px !important;
      box-shadow: initial !important;
      &::after {
        display: none !important;
      }
      &::before {
        display: none !important;
      }
      &.tab-selected {
        background-color: $active-color !important;
      }
    }
  }
}
</style>
