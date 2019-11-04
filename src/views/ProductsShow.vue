<template>
  <div class="products-show">
    <img v-bind:src="product.image_url" v-bind:alt="product.name" />
    <h1>{{ product.name }}</h1>
    <h2>{{ product.description }}</h2>
    <h2>{{ product.effects }}</h2>
    <h1>Helps to Treat</h1>
    <div v-for="condition in product.conditions">
      <h2>
        <router-link :to="`/conditions/${condition.id}`">{{ condition.name }}</router-link>
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
      product: {}
    };
  },
  created: function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      this.product = response.data;
    });
  },

  methods: {}
};
</script>
