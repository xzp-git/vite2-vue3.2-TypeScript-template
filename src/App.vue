<template>
  <HelloWorld :msg="msg.text" />
  <el-button type="primary">anniu</el-button>
  <router-view></router-view>
</template>

<script setup lang="ts">
import msg from './msg'
</script>
