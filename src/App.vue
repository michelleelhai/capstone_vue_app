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
      <input type="text" v-model="searchFor" list="searchBar" />
      <button v-on:click="routeToPage"></button>
      <datalist id="searchBar">
        <option v-for="product in products">{{ product.name }}</option>
        <option v-for="condition in conditions">{{ condition.name }}</option>
      </datalist>
    </div>
    <router-view />
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
      searchFor: ""
    };
  },
  created: function() {
    axios.get("/api/products/").then(response => {
      this.products = response.data;
    }),
      axios.get("/api/conditions").then(response => {
        this.conditions = response.data;
      });
  },
  methods: {
    routeToPage: function() {}
  }
};
</script>
