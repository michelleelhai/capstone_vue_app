<template>
  <div class="user-show">
    <h1>{{ user.username }}</h1>
    <div v-for="condition in user.conditions">
      <h2>
        <router-link :to="`/conditions/${condition.id}`">{{ condition.name }}</router-link>
        <button v-on:click="destroyCondition(condition)"></button>
        <router-link :to="`/condition/${condition.id}/edit`">Edit condition</router-link>
      </h2>
    </div>
    <div v-for="product in user.products">
      <h2>
        <router-link :to="`/products/${product.id}`">{{ condition.name }}</router-link>
        <button v-on:click="destroyProduct(product)"></button>
        <router-link :to="`/product/${product.id}/edit`">Edit Product</router-link>
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
      user: {}
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
    });
  },
  methods: {
    destroyProduct: function(product) {
      axios.delete("/api/products/" + product.id).then(response => {
        this.$router.push("/users/" + this.$route.params.id);
      });
    },
    destroyCondition: function(condition) {
      axios.delete("/api/conditions/" + condition.id).then(response => {
        this.$router.push("/users/" + this.$route.params.id);
      });
    }
  }
};
</script>
