import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';

let productModal = {};
let delProductModal = {};

const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/api',
      apiPath: 'alanwu0828',
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;

    //Bootstrap 
    productModal = new bootstrap.Modal(document.getElementById('productModal'));

    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));

    this.getProducts();
  },
  methods: {
    getProducts() {
      const url = `${this.apiUrl}/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
          } else {
            alert(res.data.messages);
          }
        }).catch((err) => {
          console.log(err);
        })
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempProduct = {};
        productModal.show();
      } else {
        this.tempProduct = { ...item };
        productModal.show();
      }
    },
    createImages() {
      this.tempProduct.imagesUrl = ['']
    },
    updateProduct() {
      let url = `${this.apiUrl}/${this.apiPath}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        url = `${this.apiUrl}/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      axios[method](url, { data: this.tempProduct })
        .then(res => {
          if (res.data.success) {
            this.getProducts();
            productModal.hide();
          }
        }).catch(err => {
          console.log(err);
        })
    },
    delModal(item) {
      this.tempProduct = item;
      delProductModal.show();
    },
    delProduct() {
      const url = `${this.apiUrl}/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url)
        .then(res => {
          if (res.data.success) {
            alert(res.data.message);
            delProductModal.hide();
            this.getProducts();
          } else {
            alert(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        })
    }
  }
});

app.mount('#app');
