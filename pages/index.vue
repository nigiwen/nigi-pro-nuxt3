<script setup lang='ts'>
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs>()
</script>

<template>
  <a-date-picker v-model:value="value" />
</template>

<style scoped lang='scss'>

</style>
