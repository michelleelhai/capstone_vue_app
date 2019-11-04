<template>
  <div class="products-edit">
    <h1>Edit Product</h1>
    <form v-on:submit.prevent="updateProduct">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="product.name" />
      Description:
      <input type="text" v-model="product.description" />
      Image_url:
      <input type="text" v-model="product.image_url" />
      Effects:
      <input type="text" v-model="product.effects" />
      <input type="submit" value="Update" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      product: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      this.product = response.data;
    });
  },
  methods: {
    updateProduct: function(product) {
      var params = {
        name: product.name,
        description: product.description,
        image_url: product.image_url,
        effects: product.effects
      };
      axios
        .patch("/api/products/" + this.product.id, params)
        .then(response => {
          this.$router.push("/products/" + this.product.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
