<template>
  <div class="conditions-show">
    <img v-bind:src="condition.image_url" v-bind:alt="condition.name" />
    <h1>{{ condition.name }}</h1>
    <h2>{{ condition.description }}</h2>
    <h1>Treated with</h1>
    <div v-for="product in condition.products">
      <h2>
        <router-link :to="`/products/${product.id}`">{{ product.name }}</router-link>
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
      condition: {}
    };
  },
  created: function() {
    axios.get("/api/conditions/" + this.$route.params.id).then(response => {
      this.condition = response.data;
      console.log(this.condition);
    });
  },
  methods: {}
};
</script>
