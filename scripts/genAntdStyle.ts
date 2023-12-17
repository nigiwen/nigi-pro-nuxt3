import { extractStyle } from 'ant-design-vue/lib/_util/static-style-extract'
import { ConfigProvider } from 'ant-design-vue'
import { h } from 'vue'
import fsExtra from 'fs-extra'

export async function genAntdStyle() {
  const css = extractStyle(node =>
    h(ConfigProvider, {}, { default: () => node }),
  )
  await fsExtra.outputFile('public/css/antd.css', css, 'utf8')
}

genAntdStyle()
