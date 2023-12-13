<script setup lang='ts'>

</script>

<template>
  <el-button type="primary" :icon="ElIconSearch">
    这是我的默认布局
  </el-button>
  <el-date-picker
    type="date"
  />
  <ul>
    <li>
      i
    </li>
  </ul>
  <slot />
</template>

<style scoped lang='scss'>

</style>
