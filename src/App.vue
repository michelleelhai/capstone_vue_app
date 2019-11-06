<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
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
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      products: [],
      conditions: [],
      searchName: ""
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
    }
  }
};
</script>
