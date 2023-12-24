<script setup lang='ts'>
import { nanoid } from 'nanoid'

definePageMeta({
  layout: false,
})

// 任何地方的滚轮都可以控制爆布区的滚动
const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)
function onWheel(event: WheelEvent) {
  y.value += event.deltaY
}

// 生成爆布区的id
function generateArray(cols: number, rows: number): string[][] {
  const result: string[][] = []

  for (let i = 0; i < rows; i++) {
    const row: string[] = []
    for (let j = 0; j < cols; j++)
      row.push(nanoid())

    result.push(row)
  }

  return result
}
const twoColumnsArray = useState('twoColumnsArray', () => generateArray(5, 2))

interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})
function onFinish(_values: any) {
  // console.log('Success:', values)
}

function onFinishFailed(_errorInfo: any) {
  // console.log('Failed:', errorInfo)
}
</script>

<template>
  <div bg="#F0F1F5" h-full w-full flex class="bg-container" @wheel="onWheel">
    <div bg="#ffffff" m-auto h-150 w-250 flex flex-row overflow-hidden rounded-xl>
      <div ref="el" w="1/2" overflow-auto>
        <article>
          <div>
            <div grid="~ cols-2 gap-2">
              <div v-for="(twoColumns, k) in twoColumnsArray" :key="k" flex="~ col gap-2">
                <div v-for="(col, j) in twoColumns" :key="j" overflow-hidden>
                  <a-image :key="col" :src="`https://api.likepoems.com/img/pixiv/?v=${col}`" :alt="col" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div w="1/2" m-auto>
        <a-form
          w-80%
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finish-failed="onFinishFailed"
        >
          <a-form-item
            label="Username"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">
              Remember me
            </a-checkbox>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">
              Submit
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
::-webkit-scrollbar {
  display: none;
}
:deep(.ant-image),
:deep(.ant-image-img) {
  height: 100%;
}
.bg-container:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  content: '';
  position: fixed;
  background: url(https://api.paugram.com/wallpaper/) center/cover;
}
</style>
