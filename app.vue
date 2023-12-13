<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>

<style>

</style>
