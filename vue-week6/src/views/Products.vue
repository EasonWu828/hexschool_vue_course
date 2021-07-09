<template>
<div class="container">
<table class="table">
<thead></thead>
<tbody>
  <tr v-for="item in products" :key="item.id">
    <td>{{ item.title }}</td>
    <td>
      <button type="button" @click="goToPage(item)">進入單一頁面</button>
    </td>
  </tr>
</tbody>
</table>
</div>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    goToPage (item) {
      this.$router.push(`/product/${item.id}`)
    }
  },
  created () {
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
    this.$http.get(url)
      .then((res) => {
        if (res.data.success) {
          this.products = res.data.products
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
