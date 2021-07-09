import productModal from './productModal.js';

const apiUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = 'alanwu0828';

const app = Vue.createApp({
  data() {
    return {
      // 讀取效果
      loadingStatus: {
        loadingItem: '',
        loadingTarget: '',
      },
      // 產品列表
      products: [],
      // props 傳遞到內層的暫存資料
      product: {},
      // 表單結構
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      // 購物車列表
      cart: {},
    };
  },
  methods: {
    getProducts() {
      const api = `${apiUrl}/api/${apiPath}/products`;
      axios.get(api)
        .then(res => {
          if (res.data.success) {
            this.products = res.data.products;
          } else {
            alert(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        })
    },
    openModal(item) {
      const api = `${apiUrl}/api/${apiPath}/product/${item.id}`;
      this.loadingStatus.loadingItem = item.id;
      this.loadingStatus.loadingTarget = 'openModal';
      axios.get(api)
        .then(res => {
          this.loadingStatus.loadingItem = '';
          this.loadingStatus.loadingTarget = '';
          if (res.data.success) {
            this.product = res.data.product;
            this.$refs.userProductModal.openModal();
          } else {
            alert(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        })
    },
    addCart(id, qty = 1) {
      const cart = {
        product_id: id,
        qty
      }
      const api = `${apiUrl}/api/${apiPath}/cart`;
      this.loadingStatus.loadingItem = id;
      this.loadingStatus.loadingTarget = 'addCart';
      axios.post(api, { data: cart })
        .then(res => {
          this.loadingStatus.loadingItem = '';
          this.loadingStatus.loadingTarget = '';
          if (res.data.success) {
            alert(res.data.message);
            this.getCart();
          }
        }).catch(err => {
          console.log(err);
        })
    },
    getCart() {
      const api = `${apiUrl}/api/${apiPath}/cart`;
      axios.get(api)
        .then(res => {
          if (res.data.success) {
            this.cart = res.data.data;
          }
        }).catch(err => {
          console.log(err);
        })
    },
    updateCart(item) {
      const api = `${apiUrl}/api/${apiPath}/cart/${item.id}`;
      //購物車 id
      const cart = {
        product_id: item.product.id, //產品id
        qty: item.qty
      }
      this.loadingStatus.loadingItem = item.id;
      axios.put(api, { data: cart })
        .then(res => {
          this.loadingStatus.loadingItem = '';
          if (res.data.success) {
            alert(res.data.message)
            this.getCart();
          }
        }).catch(err => {
          console.log(err);
        })
    },
    removeAllCartItems() {
      const api = `${apiUrl}/api/${apiPath}/carts`;
      axios.delete(api)
        .then(res => {
          if (res.data.success) {
            alert(res.data.message);
            this.getCart();
          }
        }).catch(err => {
          console.log(err);
        })
    },
    removeCartItem(id) {
      const api = `${apiUrl}/api/${apiPath}/cart/${id}`;
      this.loadingStatus.loadingItem = id;
      axios.delete(api)
        .then(res => {
          this.loadingStatus.loadingItem = '';
          if (res.data.success) {
            alert(res.data.message);
            this.getCart();
          }
        }).catch(err => {
          console.log(err);
        })
    },
    submitOrder() {
      const api = `${apiUrl}/api/${apiPath}/order`;
      const orderData = this.form;
      axios.post(api, { data: orderData })
        .then(res => {
          if (res.data.success) {
            alert(res.data.message);
            this.$refs.orderForm.resetForm();
            this.form.message = '';
            this.getCart();
          }
        }).catch(err => {
          console.log(err);
        })
    }
  },
  mounted() {
    this.getProducts();
    this.getCart();
    // this.$refs.userProductModal.openModal();
  },
});

// VeeValiadation
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);


app.component('userProductModal', productModal)
app.mount('#app');