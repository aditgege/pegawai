<template>
      <el-alert
      class="mt-3"
      :title="message"
      type="error"
      :closable="false"
      show-icon>
    </el-alert>
</template>
<script>
export default {
  name: 'Notification',
  props: ['message',],
  
}
</script>