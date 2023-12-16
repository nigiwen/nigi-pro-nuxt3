<script lang="ts" setup>
const selectedKeys = ref<string[]>(['1'])
const [collapsed] = useToggle()

const tabList = ref([
  { id: 1, label: '首页' },
  { id: 2, label: '系统管理' },
  { id: 3, label: '菜单管理' },
])
const activeTab = ref(3)
function onTab(id: number) {
  activeTab.value = id
}
</script>

<template>
  <a-layout id="classic-layout" min-h="100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible bg="#ffffff">
      <div class="logo" gap-1>
        <img src="/nuxt.svg" alt="log" h-8 w-8>
        <h2 v-if="!collapsed" color="var(--site-text-color)" whitespace-nowrap text-5 font-700>
          Nigi Pro Admin
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
        <div flex-auto>
          <div class="tab-list">
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
              Nigi
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
        Content<a-button type="primary">
          Primary Button
        </a-button>
      </a-layout-content>
      <a-layout-footer p-x-12 p-y-3 text-center>
        Nigi Pro Admin ©2024 Created by wen403
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
#classic-layout {
  :deep(.ant-layout-sider-trigger) {
    background-color: #fffafa !important;
    .anticon {
      color: rgba(0, 0, 0, 0.88);
    }
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    margin: 16px 0;
  }
}
</style>

<style scoped lang="scss">
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

      &::after {
        display: none;
      }
    }

    &:first-child {
      &.tab-selected {
        box-shadow:
          19px 14px 0 0 $active-color,
          0 0 0 0;
      }

      &::before {
        display: none;
      }
    }
  }

  .tab-selected {
    opacity: 1;
    background: $active-color;
    border-radius: 12px 12px 0 0;
    color: #1677ff;
    box-shadow:
      19px 14px 0 $active-color,
      -19px 14px 0 0 $active-color;
  }
  .not-selected {
    color: #a0a0a0;
  }
  .tab-selected::before {
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
  .tab-selected::after {
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

  .not-selected::before {
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
  .not-selected::after {
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
</style>
