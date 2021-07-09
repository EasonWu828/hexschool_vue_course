<template>
  登入
  <button type="button" @click="goToAdmin">後台管理</button>
</template>

<script>
export default {
  methods: {
    goToAdmin () {
      this.$router.push('/admin/products')
    }
  }
}
</script>
