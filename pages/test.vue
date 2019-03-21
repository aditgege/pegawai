<template>
  <div>
    {{ tanggal | moment }}
  </div>
</template>

<script>
  export default{
    filters:{
      $moment(val){
        return this.$moment(val, "YYYY-MM-DD").fromNow();
      }
    },
    data: {
      tanggal : "2018-01-01"
    }
  }
</script>