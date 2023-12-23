<script setup lang='ts'>
definePageMeta({
  layout: false,
})

const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)
function onWheel(event: WheelEvent) {
  y.value += event.deltaY
}

function generateTwoColumnsArray(totalNumbers: number, columnCount: number, numbersPerColumn: number): number[][] {
  const maxNumber = 200
  const result: number[][] = []
  for (let i = 0; i < columnCount; i++) {
    const columnNumbers: number[] = []

    for (let j = 0; j < numbersPerColumn; j++) {
      let randomNumber = Math.floor(Math.random() * maxNumber) + 1

      // 如果已生成的数字总数达到上限，则重头开始
      if (columnNumbers.length >= totalNumbers)
        columnNumbers.length = 0

      // 检查数字是否重复，如果重复则重新生成
      while (columnNumbers.includes(randomNumber))
        randomNumber = Math.floor(Math.random() * maxNumber) + 1

      columnNumbers.push(randomNumber)
    }
    result.push(columnNumbers)
  }
  return result
}
// 生成包含 2 列、每列包含 100 个不重复数字的数组
const twoColumnsArray = useState('twoColumnsArray', () => generateTwoColumnsArray(100, 2, 200))

const bgArr = reactive({
  luxueqi: 3,
  meidusha: 7,
  qianrenxue: 10,
  xiaowu: 8,
  xiaowu2: 8,
})
function getRandomValue(obj: Record<string, number>): [string, number] {
  const keys = Object.keys(obj)

  if (keys.length === 0)
    throw new Error('Object is empty.')

  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  const randomNumber = Math.floor(Math.random() * obj[randomKey]) + 1

  return [randomKey, randomNumber]
}
const [randomKey, randomValue] = getRandomValue(bgArr)

const dynamicBackgroundImageUrl = ref(`http://119.91.195.110:3001/static/image/beijing/${randomKey}/${randomValue}.jpg`)
</script>

<template>
  <div bg="#F0F1F5" h-full w-full flex @wheel="onWheel">
    <div w="45%" :style="{ backgroundImage: `url(${dynamicBackgroundImageUrl})` }" h-full bg-cover bg-top bg-no-repeat op="80" />
    <div bg="#ffffff" m-auto h-150 w-250 flex flex-row overflow-hidden rounded-xl>
      <div ref="el" w="1/2" overflow-auto>
        <article>
          <div>
            <div grid="~ cols-2 gap-2">
              <div v-for="(twoColumns, k) in twoColumnsArray" :key="k" flex="~ col gap-2">
                <div v-for="(col, j) in twoColumns" :key="j" overflow-hidden>
                  <a-image :key="col" :src="`http://119.91.195.110:3001/static/image/thumbnail/${col}.jpg`" alt="" />
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
