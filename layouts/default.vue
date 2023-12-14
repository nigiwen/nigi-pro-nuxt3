<script setup lang='ts'>
function handleMessage() {
  message.info('This is a normal message')
}
</script>

<template>
  <a-button @click="handleMessage">
    button
  </a-button>
  <a-date-picker />
  <ul>
    <li>
      i
    </li>
  </ul>
  <slot />
</template>

<style scoped lang='scss'>

</style>
