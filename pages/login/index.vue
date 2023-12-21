<script setup lang='ts'>
import { nanoid } from 'nanoid'

definePageMeta({
  layout: false,
})

const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)

function aaaa(event: WheelEvent) {
  y.value += event.deltaY
}
</script>

<template>
  <div bg="#F0F1F5" h-full w-full flex-center @wheel="aaaa">
    <div h-150 w-250 flex flex-row overflow-hidden rounded-xl bg="#ffffff">
      <div ref="el" w="1/2" overflow-auto>
        <article>
          <div>
            <div grid="~ cols-2 gap-2">
              <div v-for="(_, k) in new Array(2)" :key="k" flex="~ col gap-2">
                <div v-if="k === 0" overflow-hidden rounded>
                  <iframe src="https://pixiv.mokeyjay.com" style="width:240px; height:320px; border: 0" />
                </div>
                <div v-for="(_, k) in new Array(10)" :key="k" overflow-hidden rounded>
                  <img :src="`https://api.r10086.com/樱道随机图片api接口.php?图片系列=P站系列4&v=${nanoid()}`" alt="">
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div w="1/2">
        2
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
::-webkit-scrollbar {
  display: none;
}
</style>
