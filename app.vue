<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import { appName } from '~/constants'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

useHead({
  title: appName,
})
</script>

<template>
  <a-config-provider :locale="zhCN">
    <VitePwaManifest />
    <NuxtLayout>
      <a-extract-style>
        <NuxtPage />
      </a-extract-style>
    </NuxtLayout>
  </a-config-provider>
</template>

<style>

</style>
