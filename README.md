# 模板使用初始化

- 使用模板的时候 要先进行初始化`git`仓库，`git init`
- 安装依赖 `pnpm i`
- 配置`git hooks`，按顺序执行下面命令
  - `npx mrm lint-staged`
  - `npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`

# Vite2 + Vue3 + Typescript 开发环境

## 1. 安装 Vite

---

### 1.1 vite 介绍

- Vite (法语意为 "快速的"，发音 /vit/) 是下一代前端开发与构建工具
- 💡 极速的服务启动 使用原生 ESM 文件，无需打包!
- ⚡️ 轻量快速的热重载 无论应用程序大小如何，都始终极快的模块热重载（HMR）
- 🛠️ 丰富的功能 对 TypeScript、JSX、CSS 等支持开箱即用。
- 📦 优化的构建 可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建
- 🔩 通用的插件 在开发和构建之间共享 Rollup-superset 插件接口。
- 🔑 完全类型化的 API 灵活的 API 和完整 TypeScript

### 2.2 vite 安装

- [pnpm](https://pnpm.io/)
- [vite](https://vitejs.dev/config/)

```
pnpm install vite -D
```

## 2. 启动 vite

---

- [esbuild](https://esbuild.github.io/)
- Vite 主要由两部分组成
  - 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）,Vite 将会使用 esbuild 预构建依赖。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍
  - 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源

### 2.1 package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

### 2.2 vite.config.js

```js
import { defineConfig } from 'vite'
export default defineConfig({})
```

### 2.3 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 2.4 src\env.d.ts

- Vite 默认的类型定义是写给它的 Node.js API 的,要将其补充到一个 Vite 应用的客户端代码环境中
- 客户端类型
- 如果你的库依赖于某个全局库
  - 使用/// 指令
  - 三斜线指令仅可放在包含它的文件的最顶端
  - 三斜线引用告诉编译器在编译过程中要引入的额外的文件

```
/// <reference types="vite/client" />
```

### 2.5 src\main.ts

```js
export function render() {
  document.getElementById("app")!.innerHTML = "main";
}
render();

if (import.meta.hot) {
  import.meta.hot.accept((updatedModule) => updatedModule.render());
}
```

### 2.6 tsconfig.json

```
https://www.typescriptlang.org/tsconfig
```

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom", "es2018.promise"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

| 参数             | 解释                                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| target           | 用于指定编译之后的版本目标                                                                                                                                                                 |
| module           | 生成的模块形式：none、commonjs、amd、system、umd、es6、es2015 或 esnext 只有 amd 和 system 能和 outFile 一起使用 target 为 es5 或更低时可用 es6 和 es2015                                  |
| moduleResolution | 选择模块解析策略，有 node 和 classic 两种类型 module-resolution                                                                                                                            |
| strict           | 是否启动所有类型检查                                                                                                                                                                       |
| jsx              | react 模式会生成 React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js                                                                                                |
| sourceMap        | 把 ts 文件编译成 js 文件的时候，同时生成对应的 sourceMap 文件                                                                                                                              |
| esModuleInterop  | 为导入内容创建命名空间,实现 CommonJS 和 ES 模块之间的互相访问                                                                                                                              |
| lib              | 编译时引入的 ES 功能库，包括：es5 、es6、es7、dom 等。如果未设置，则默认为： target 为 es5 时: ["dom", "es5", "scripthost"] target 为 es6 时: ["dom", "es6", "dom.iterable", "scripthost"] |
| include          | include 也可以指定要编译的路径列表，但是和 files 的区别在于，这里的路径可以是文件夹，也可以是文件                                                                                          |

### 2.7 .gitignore

```
node_modules
pnpm-debug.log*
.vscode/*
sh.exe.stackdump
dist
coverage
```

## 3. 支持 vue3

---

### 3.1 安装 vue

```js
pnpm install vue
pnpm install @vitejs/plugin-vue -D
```

### 3.2 vite.config.ts

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()]
})
```

### 3.3 src\env.d.ts

```js
/// <reference types="vite/client" />


declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

```

### 3.4 src\main.ts

```js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.mount('#app')
```

### 3.5 src\App.vue

```html
<template>
  <HelloWorld msg="Vue3 + TypeScript + Vite2" />
</template>

<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
</script>
```

### 3.6 HelloWorld.vue

- 单文件组件 `<script setup>`是在单文件组件 (`SFC`) 中使用组合式 `API` 的编译时语法糖
- `lang`属性可以声明预处理语言
- `ref`接受一个内部值并返回一个响应式且可变的 `ref` 对象。`ref` 对象仅有一个 `.value` 属性，指向该内部值,在 `JS` 中操作数据需要`.value`,在模板中读取不需要`.value`
- 在 `<script setup>` 中必须使用 `defineProps API` 来声明 `props`，只在 `<script setup>` 中才能使用的编译器宏。他们不需要导入且会随着 `<script setup>` 处理过程一同被编译掉

```html
<template>
  <h1>{{ msg }}</h1>
</template>

<script setup lang="ts">
  defineProps<{ msg: string }>()
</script>
```

## 4. 支持 typescrip

---

- 只编译不校验

### 4.1 安装

- `typescript`是一种基于 `JavaScript` 的强类型编程语言
- `vue-tsc`可以对 `Vue3` 进行 `Typescript` 类型较验

```
pnpm install typescript vue-tsc  -D
```

### 4.2 package.json

package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build"
  }
}
```

## 5.ESLint

---

- ESLinteslint 是一个插件化并且可配置的 JavaScript 语法规则和代码风格的检查工具
  - 代码质量问题：使用方式有可能有问题
  - 代码风格问题：风格不符合一定规则

### 5.1 安装

```
pnpm install eslint eslint-plugin-vue  @typescript-eslint/parser @typescript-eslint/eslint-plugin @vue/eslint-config-typescript   -D
```

| 参数                             | 解释                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------- |
| eslint                           | ESLint 是一个用于识别和报告在 ECMAScript/JavaScript 代码中发现的模式的工具      |
| eslint-plugin-vue                | Vue 的官方 ESLint 插件                                                          |
| @typescript-eslint/parser        | 一个 ESLint 解析器，它利用 TypeScript-ESTree 允许 ESLint 检查 TypeScript 源代码 |
| @typescript-eslint/eslint-plugin | 一个 ESLint 插件，为 TypeScript 代码库提供 lint 规则                            |
| @vue/eslint-config-typescript    | Vue 的 eslint-config-typescript                                                 |

### 5.2 .eslintrc.js

.eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly'
  }
}
```

### 5.3 .eslintignore

.eslintignore

```
node_modules
dist
*.css
*.jpg
*.jpeg
*.png
*.gif
*.d.ts
```

### 5.4 package.json

package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "lint": "eslint --ext .ts,.tsx,vue src/** --no-error-on-unmatched-pattern --quiet",
    "lint:fix": "eslint --ext .ts,.tsx,vue src/** --no-error-on-unmatched-pattern --quiet --fix"
  }
}
```

## 6. Prettier

- ESLint 主要解决的是代码质量问题
- 代码质量规则
  - no-unused-vars 禁止出现未使用过的变量
  - no-implicit-globals 禁止在全局范围内使用变量声明和 function 声明
  - prefer-promise-reject-errors 要求使用 Error 对象作为 Promise 拒绝的原因
- prettier 主要解决的是代码风格问题
  - max-len 最大长度
  - no-mixed-spaces-and-tabs 不允许空格和 tab 混合
  - keyword-spacing 关键字的空
  - comma-style 冒号风格

### 6.1 安装

```
pnpm install prettier eslint-plugin-prettier  @vue/eslint-config-prettier -D
```

| 名称                        | 说明                            |
| --------------------------- | ------------------------------- |
| prettier                    | 代码格式化                      |
| eslint-plugin-prettier      | 作为 ESLint 规则运行得 prettier |
| @vue/eslint-config-prettier | Vue 的 eslint-config-prettier   |

### 6.2 .eslintrc.js

`.eslintrc.js`

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: false,
        tabWidth: 2,
        indent: 2,
        semi: false,
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ],
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  },
  globals: {
    defineProps: 'readonly'
  }
}
```

### 6.3 .prettierrc.js

`.prettierrc.js`

```js
module.exports = {
  singleQuote: true, //使用单引号
  semi: false, ////末尾添加分号
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  endOfLine: 'auto'
}
```

### 6.4 .prettierignore

`.prettierignore`

```
node_modules
dist
```

### 6.5 editorconfig

- `editorconfig` 帮助开发人员在不同的编辑器和 `IDE` 之间定义和维护一致的编码样式
- 不同的开发人员，不同的编辑器，有不同的编码风格，而 `EditorConfig` 就是用来协同团队开发人员之间的代码的风格及样式规范化的一个工具，而`.editorconfig` 正是它的默认配置文件
- `EditorConfig`
- `vscode` 这类编辑器，需要自行安装 `editorconfig` 插件

#### 6.5.1 .editorconfig

- `Unix` 系统里，每行结尾只有换行,即`\n LF(Line Feed)`
- `Windows` 系统里面，每行结尾是换行 回车，即`\r\n CR/LF`
- `Mac` 系统里，每行结尾是回车，即`\r CR(Carriage Return)`

```
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
```

### 6.6 自动格式化

- 设置 搜索 `format on save` 选中
- 设置 搜索 `formatter` 选择 `prettier`

## 7. git hooks

- 可以在 `git commit` 之前检查代码，保证所有提交到版本库中的代码都是符合规范的
- 可以在 `git push` 之前执行单元测试,保证所有的提交的代码经过单元测试
- husky 可以让我们向项目中方便添加` git hooks`,它会自动在仓库中的 `.git/ `目录下增加相应的钩子,比如` - pre-commit` 钩子就会在你执行 `git commit `命令的时候的触发
- `lint-staged` 用于实现每次提交只检查本次提交所修改的文件
- `mrm` 可以根据 `package.json` 依赖项中的代码质量工具来安装和配置 `husky` 和 `lint-staged`
- `Commitlint` 可以规范 `git commit -m ""`中的描述信息
  > 使用 `husky + lint-staged` 助力团队编码规范, `husky&lint-staged `安装推荐使用 `mrm`, 它将根据 `package.json `依赖项中的代码质量工具来安装和配置` husky 和 lint-staged`，因此请确保在此之前安装并配置所有代码质量工具，如 `Prettier` 和 `ESlint`

## 7.1 lint-staged

### 7.1.1 安装

- mrm 安装 lint-staged 的同时会安装 husky

```
pnpm install mrm  -D
npx mrm lint-staged
```

### 7.1.2 package.json

package.json

```json
{
  "name": "vite2vue3ts-prepare",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "lint": "eslint --ext .ts,vue src/** --no-error-on-unmatched-pattern --quiet",
    "lint:fix": "eslint --ext .ts,vue src/** --no-error-on-unmatched-pattern --fix",
+   "prepare": "husky install"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vue": "^3.2.31"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^5.12.1",
    "@typescript-eslint/parser": "^5.12.1",
    "@vitejs/plugin-vue": "^2.2.2",
    "@vue/eslint-config-prettier": "^7.0.0",
    "@vue/eslint-config-typescript": "^10.0.0",
    "eslint": "^8.10.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.5.0",
+   "husky": "^7.0.0",
+   "lint-staged": "^12.3.4",
+   "mrm": "^3.0.10",
    "prettier": "^2.5.1",
    "typescript": "^4.5.5",
    "vite": "^2.8.4",
    "vue-tsc": "^0.32.0"
  },
+ "lint-staged": {
+   "*.{ts,vue}": "eslint --cache --fix"
+ }
}
```

## 7.2 commitlint

- commitlint 推荐我们使用(config-conventional)[https://www.npmjs.com/package/@commitlint/config-conventional]配置去写 commit
- 提交格式 git commit -m <type>[optional scope]: <description>
  - type ：用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
  - optional scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块
  - description：一句话描述此次提交的主要内容，做到言简意赅

### 7.2.1 type

| 类型     | 描述                                                   |
| -------- | ------------------------------------------------------ |
| build    | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
| chore    | 其他修改, 比如改变构建流程、或者增加依赖库、工具等     |
| ci       | 持续集成修改                                           |
| docs     | 文档修改                                               |
| feature  | 新特性、新功能                                         |
| fix      | 修改 bug                                               |
| perf     | 优化相关，比如提升性能、体验                           |
| refactor | 代码重构                                               |
| revert   | 回滚到上一个版本                                       |
| style    | 代码格式修改                                           |
| test     | 测试用例修改                                           |

### 7.2.2 安装

`pnpm install @commitlint/cli @commitlint/config-conventional -D`

### 7.2.3 配置

`npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`

### 7.2.4 commitlint.config.js

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feature',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
}
```

### 7.2.5 安装 commitizen

`pnpm i -D commitizen`

### 7.2.6 安装提交时要使用的规则

提交时使用`git cz` 代替`git commit`

`pnpm i cz-conventional-changelog -D`

## 8.配置别名

### 8.1 vite.config.ts

```js
import { defineConfig } from "vite"
+import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
export default defineConfig({
+ resolve: {
+   alias: {
+     "@": resolve("src")
+   }
+ },
  plugins: [vue()]
})
```

### 8.2 tsconfig.json

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom", "es2018.promise"],
+   "baseUrl": ".",
+   "paths": {
+     "@/*": ["src/*"]
+   }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### 8.3 App.vue

src\App.vue

```vue
<script setup lang="ts">
+import HelloWorld from "@/components/HelloWorld.vue"
import msg from "./msg"
</script>

<template>
  <HelloWorld :msg="msg.text" />
</template>

<style></style>
```

## 9.样式处理

---

### 9.1 全局样式

### 9.1.1 src\assets\styles\global.css

```css
#app {
  background-color: coral;
}
```

### 9.1.2 src\main.ts

src\main.ts

```js
import { createApp } from "vue"
import App from "./App.vue"
+import "@/assets/styles/global.css"
const app = createApp(App)
app.mount("#app")
```

### 9.2 局部样式

- 当 `style` 标签有 `scoped` 属性时，它的 `CSS` 只作用于当前组件中的元素
- 它使用了 `data-v-hash` 的方式来使 `css `有了它对应模块的标识

### 9.2.1 HelloWorld.vue

src\components\HelloWorld.vue

```vue
<template>
  <h1>{{ msg }}</h1>
  <a href="">超链接</a>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>
<style scoped>
a {
  color: chartreuse;
}
</style>
```

## 9.3 CSS Modules

通过 `module` 作用的 `style` 都被保存到`$style `对象中

### 9.3.1 内联

#### 9.3.1.1 HelloWorld.vue

src\components\HelloWorld.vue

```vue
<template>
  <h1>{{ msg }}</h1>
  <a href="">超链接</a>
  +
  <h1 :class="$style.module">Module CSS</h1>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<style scoped>
a {
  color: chartreuse;
}
</style>

<style module>
+.module {
+  color: darkcyan;
+}
+
+
</style>
```

### 9.3.2 外联

- 任何以`.module.css`为后缀名的 `CSS`文件都被认为是一个 `CSS modules `文件
- 导入这样的文件会返回一个相应的模块对象

#### 9.3.2.1 HelloWorld.module.css

src\components\HelloWorld.module.css

```css
.out {
  color: aquamarine;
}
```

#### 9.3.2.2 HelloWorld.vue

src\components\HelloWorld.vue

```vue
<template>
  <h1>{{ msg }}</h1>
  <a href="">超链接</a>
  <h1 :class="$style.module">Module CSS</h1>
  +
  <h1 :class="style.out">OUT Module CSS</h1>
</template>

<script setup lang="ts">
+import style from "./HelloWorld.module.css"
defineProps<{ msg: string }>()
</script>
```

## 9.4 预处理器

- Vite 也同时提供了对.scss, .sass, .less, .styl 和 stylus 文件的内置支持
- 没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖
- Vite 为 Sass 和 Less 改进了@import 解析，以保证 Vite 别名也能被使用

### 9.4.1 安装

`pnpm install sass less -D`

### 9.4.2 src\components\HelloWorld.vue

src\components\HelloWorld.vue

```vue
<template>
  <h1>{{ msg }}</h1>
  <a href="">超链接</a>
  <h1 :class="$style.module">Module CSS</h1>
  <h1 :class="style.out">OUT Module CSS</h1>
</template>

<script setup lang="ts">
import style from './HelloWorld.module.css'
defineProps<{ msg: string }>()
</script>
<style scoped>
a {
  color: chartreuse;
}
</style>
<style module>
.module {
  color: darkcyan;
}
</style>
<style scoped lang="less">
@color: cornflowerblue;
.less {
  color: @color;
}
</style>
<style scoped lang="scss">
$color: rgb(194, 143, 241);

.sass {
  color: $color;
}
</style>
```

## 9.5 全局注入

- 可以把全局样式文件全局注入到项目中

### 9.5.1 vite.config.ts

vite.config.ts

```js
import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve("src")
    }
  },
  plugins: [vue()],
+ css: {
+   preprocessorOptions: {
+     scss: {
+       additionalData: '@import "@/styles/theme.scss";'
+     },
+     less: {
+       additionalData: '@import "@/styles/theme.less";'
+     }
+   }
+ }
})
```

## 9.6 PostCSS

- 为了浏览器的兼容性，有时候我们必须加入`-webkit`,`-ms`,`-o`,`-moz` 这些前缀
  - `Trident` 内核：主要代表为 `IE` 浏览器, 前缀为`-ms`
  - `Gecko` 内核：主要代表为 `Firefox`, 前缀为`-moz`
  - `Presto` 内核：主要代表为 `Opera`, 前缀为`-o`
  - `Webkit` 内核：产要代表为 `Chrome` 和 `Safari`, 前缀为`-webkit`
    如果项目包含有效的 `PostCSS` 配置，它将会自动应用于所有已导入的 `CSS`

### 9.6.1 安装

`pnpm install autoprefixer -D`

### 9.6.2 postcss.config.js

postcss.config.js

```js
module.exports = {
  plugins: [require('autoprefixer')]
}
```

### 9.6.3 .browserslistrc

项目根目录下.browserslistrc

```
 > 1%
 maintained node versions
 not dead
 not op_mini all
```

或者
packages.json

```json
{
  "browserslist": [
    "> 1%",
    "maintained node versions",
    "not op_mini all",
    "not dead"
  ]
}
```

## 10.静态资源处理

assets
服务时引入一个静态资源会返回解析后的公共路径

### 10.1 模板引入

src\components\HelloWorld.vue

```vue
<template>
  + <img src="@/assets/images/logo.png" style="width: 50px" />
</template>
```

### 10.2 JS 中引入

src\components\HelloWorld.vue

```vue
<script setup lang="ts">
+import logoUrl from "@/assets/logo.png"
</script>
<template>+ <img :src="logoUrl" style="width: 50px" /></template>
```

### 10.3 CSS 引入

src\components\HelloWorld.vue

```vue
<template>
  +
  <div class="logo"></div>
</template>
<style scoped>
.logo {
  width: 50px;
  height: 50px;
  background-image: url(@/assets/logo.png);
  background-size: contain;
}
</style>
```

## 10.4 public 目录

- public 目录
- 如果有以下需求
  - 这些资源不会被源码引用（例如 robots.txt）
  - 这些资源必须保持原有文件名（没有经过 hash）
  - 那么你可以将该资源放在指定的 public 目录中，它应位于你的项目根目录
  - 该目录中的资源在开发时能直接通过 / 根路径访问到，并且打包时会被完整复制到目标目录的根目录下

## 11. 环境变量和模式

- Vite 在一个特殊的 import.meta.env 对象上暴露环境变量
  - import.meta.env.MODE: {string} 应用运行的模式
  - import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由 base 配置项决定
  - import.meta.env.PROD: {boolean} 应用是否运行在生产环境
  - import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD 相反)

### 11.1 .env.development

`VITE_APP_WEB_URL = "/dev"`

### 11.2 .env.production

`VITE_APP_WEB_URL = "/prod"`

### 11.3 src\main.ts

`console.log(import.meta.env)`

### 11.4 package.json

package.json

```json
{
  "scripts": {
+    "build:dev": "vue-tsc --noEmit && vite build --mode development",
+    "build:prod": "vue-tsc --noEmit && vite build --mode production",
  },
}
```
