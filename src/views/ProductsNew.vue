<template>
  <div class="products-new">
    <form v-on:submit.prevent="createProduct()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="newProductName" />
      Effects:
      <input type="text" v-model="newProductEffects" />
      Image URL:
      <input type="text" v-model="newProductImageUrl" />
      Description:
      <input type="text" v-model="newProductDescription" />
      <input type="submit" value="Create Product" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      newProductName: "",
      newProductEffects: "",
      newProductImageUrl: "",
      newProductDescription: "",
      errors: [],
      product: {}
    };
  },
  created: function() {},
  methods: {
    createProduct: function() {
      var params = {
        name: this.newProductName,
        effects: this.newProductEffects,
        image_url: this.newProductImageUrl,
        description: this.newProductDescription
      };
      axios
        .post("/api/products", params)
        .then(response => {
          this.product = response.data;
          this.$router.push("/products/" + this.product.id);
        })
        .catch(error => {
          console.log(error.data);
          this.errors = response.data.errors;
        });
    }
  }
};
</script>
