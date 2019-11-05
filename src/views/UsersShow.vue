<template>
  <div class="user-show">
    <h1>{{ user.username }}</h1>
    <div v-for="condition in user.conditions">
      <h2>
        <router-link :to="`/conditions/${condition.id}`">{{ condition.name }}</router-link>
        <button v-on:click="destroyCondition(condition)"></button>
        <router-link :to="`/conditions/${condition.id}/edit`">Edit condition</router-link>
      </h2>
    </div>
    <div v-for="product in user.products">
      <h2>
        <router-link :to="`/products/${product.id}`">{{ product.name }}</router-link>
        <button v-on:click="destroyProduct(product)"></button>
        <router-link :to="`/products/${product.id}/edit`">Edit Product</router-link>
      </h2>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      errors: {},
      conditions: {},
      products: {}
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      this.products = response.data.products;
      this.conditions = response.data.conditions;
    });
  },
  methods: {
    destroyProduct: function(product) {
      axios
        .delete("/api/products/" + product.id)
        .then(response => {
          console.log(response.data);
          var index = this.products.indexOf(product);
          this.products.splice(index, 1);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
    destroyCondition: function(condition) {
      axios
        .delete("/api/conditions/" + condition.id)
        .then(response => {
          console.log(response.data);
          var index = this.conditions.indexOf(condition);
          this.conditions.splice(index, 1);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    }
  }
};
</script>
