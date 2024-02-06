<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <a-extract-style>
      <NuxtPage />
    </a-extract-style>
  </NuxtLayout>
</template>

<style>

</style>
