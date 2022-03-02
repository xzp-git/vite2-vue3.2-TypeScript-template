<template>
  <h1>{{ msg }}</h1>
  <a href="">超链接</a>
  <h1 :class="$style.module">Module CSS</h1>
  <h1 :class="style.out">OUT Module CSS</h1>
  <h1 class="less">LESS CSS</h1>
  <h1 class="sass">SCSS CSS</h1>
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
  background-color: @background;
}
</style>
<style scoped lang="scss">
$color: rgb(194, 143, 241);

.sass {
  color: $color;
  background-color: $background;
}
</style>
