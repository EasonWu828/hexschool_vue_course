<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">導覽列</a>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">首頁</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
          <li class="nav-item">
          <router-link class="nav-link" to="/cart">購物車列表</router-link>
          </li>
          <li class="nav-item">
          <router-link class="nav-link" to="/login">後台登入</router-link>
          </li>
      </ul>
    </div>
  </div>
</nav>
<router-view></router-view>
</template>
