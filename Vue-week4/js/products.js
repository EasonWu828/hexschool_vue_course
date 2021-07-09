import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';

import pagination from './pagination.js';

let productModal = {};
let delProductModal = {};

const apiUrl = 'https://vue3-course-api.hexschool.io/api';
const apiPath = 'alanwu0828';

const app = createApp({
  data() {
    return {
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {}
    }
  },
  components: {
    pagination
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
    getProducts(page = 1) {
      const url = `${apiUrl}/${apiPath}/admin/products?page=${page}`;
      axios.get(url)
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            const { products, pagination } = res.data;
            this.products = products;
            this.pagination = pagination;
          } else {
            alert(res.data.messages);
            window.location = 'login.html';
          }
        }).catch((err) => {
          console.log(err);
        })
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item };
        delProductModal.show()
      }
    },
    updateProduct(tempProduct) {
      let url = `${apiUrl}/${apiPath}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        url = `${apiUrl}/${apiPath}/admin/product/${tempProduct.id}`;
        method = 'put';
      }
      axios[method](url, { data: tempProduct })
        .then(res => {
          if (res.data.success) {
            this.getProducts();
            productModal.hide();
          } else {
            alert(res.data.messages);
          }
        }).catch(err => {
          console.log(err);
        })
    },
    delProduct(tempProduct) {
      const url = `${apiUrl}/${apiPath}/admin/product/${tempProduct.id}`;
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

app.component('productModal', {
  template: `<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
            <span>{{ isNew? '新增產品' : '編輯產品' }}</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="imageUrl">主要圖片</label>
                  <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl" id="imageUrl">
                  <img class="img-fluid" :src="tempProduct.imagesUrl">
                </div>
                <div class="mb-1">多圖新增</div>
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <div class="mb-1" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                    <div class="form-group">
                      <label :for="image,key">圖片網址</label>
                      <input type="text" class="form-control" placeholder="請輸入圖片連結"
                        v-model="tempProduct.imagesUrl[key]" :id="image,key">
                    </div>
                    <img class="img-fluid" :src="image">
                  </div>
                  <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length-1]">
                    <button class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="tempProduct.imagesUrl.push('')">
                      新增圖片
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages">
                    新增陣列圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題">
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">單位</label>
                    <input id="unit" v-model="tempProduct.unit" type="text" class="form-control" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input id="origin_price" v-model.number="tempProduct.origin_price" type="number" min="0"
                      class="form-control" placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input id="price" v-model.number="tempProduct.price" type="number" min="0" class="form-control"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                    placeholder="請輸入產品描述">
                  </textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea id="content" v-model="tempProduct.content" type="text" class="form-control"
                    placeholder="請輸入說明內容">
                  </textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input id="is_enabled" v-model="tempProduct.is_enabled" class="form-check-input" type="checkbox"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="$emit('update-product', tempProduct)">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>`,
  props: ['tempProduct', 'isNew'],
  methods: {
    createImages() {
      this.tempProduct.imagesUrl = ['']
    },
  }
})

app.component('delProductModal', {
  props: ['tempProduct'],
  template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="$emit('del-product', tempProduct)">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>`
})

app.mount('#app');


