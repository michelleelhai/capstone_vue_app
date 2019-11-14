<template>
  <div id="app">
    <!--  <div id="nav">
      <router-link to="/signup">Signup</router-link>
      |
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/logout">Logout</router-link>
      |
      <router-link to="/products/new">New Product</router-link>
      |
      <input type="text" v-model="searchName" list="searchBar" />
      <button v-on:click="search()">Search</button>
      {{ searchName }}
      <datalist id="searchBar">
        <option v-for="product in products">{{ product.name }}</option>
        <option v-for="condition in conditions">{{ condition.name }}</option>
      </datalist>
    </div> -->
    <nav class="navbar navbar-expand-lg navbar-dark" id="menu">
      <div class="container">
        <a class="navbar-brand" href="index.html"></a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#menu-content"
          aria-controls="menu-content"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="menu-content">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                Home
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" :to="`/users/${user_id}/`">
                Profile Information
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/login">
                Login
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/logout">
                Logout
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/signup">
                Signup
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products/new/">
                New Remedy
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
          </ul>

          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <div class="search-nav">
                <div class="input-group">
                  <input
                    type="text"
                    v-model="searchName"
                    list="searchBar"
                    class="form-control subscribe-input"
                    placeholder="Search"
                  />
                  <div class="input-group-append ml-0">
                    <button v-on:click="search()" class="btn subscribe-button" type="button">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <datalist id="searchBar">
      <option v-for="product in products">{{ product.name }}</option>
      <option v-for="condition in conditions">{{ condition.name }}</option>
    </datalist>
    <router-view :key="$route.fullPath"></router-view>

    <footer id="footer" class="bg-light footer-light">
      <div class="container container-1000">
        <div class="row">
          <div class="col-lg-2 col-sm-4"></div>
          <div class="col-lg-2 col-sm-4">
            <div class="footer-links">
              <ul class="list-unstyled">
                <li class="list-title"><a href="#">Links</a></li>
                <li><router-link to="/login">Login</router-link></li>
                <li><router-link to="/logout">Logout</router-link></li>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/products/new">New Product</router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="text-lg-right ml-lg-2"></div>
          </div>
        </div>
        <div class="footer-credits d-lg-flex justify-content-lg-between align-items-center">
          <div>
            Powered by Plants
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.search-nav {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 20px;
  line-height: 50px;
  display: block;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      products: [],
      conditions: [],
      searchName: "",
      user_id: localStorage.getItem("user_id"),
      username: localStorage.getItem("username")
    };
  },
  created: function() {
    axios.get("/api/products/").then(response => {
      this.products = response.data;
      console.log(this.products);
    });
    axios.get("/api/conditions").then(response => {
      this.conditions = response.data;
    });
    axios.get("/api/users").then(response => {
      this.users = response.data;
    });
  },
  methods: {
    search: function() {
      // console.log(this.products);
      var product = this.products.find(x => x.name === this.searchName);
      var condition = this.conditions.find(x => x.name === this.searchName);
      if (product) {
        console.log(product);
        this.$router.push("/products/" + product.id);
      } else {
        if (condition) {
          console.log(condition);
          this.$router.push("/conditions/" + condition.id);
        }
        // this.conditions.find(x => x.name === this.searchName).id;
        // console.log(this.conditions.find(x => x.name === this.searchName).id);
      }
      // console.log(conditionSearch);

      // var productsSearch = this.products.filter(function(product) {
      //   return product.name == "searchName";
      //   console.log(this.products);
      // });
    },
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
