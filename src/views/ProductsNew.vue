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
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        :autocomplete-items="filteredItems"
        @tags-changed="newTags => (tags = newTags)"
      />
      tag:{{ tag }} tags:{{ tags.map(a => a.id) }}
      filtereditems:
      {{ filteredItems }}
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  components: {
    VueTagsInput
  },
  data: function() {
    return {
      newProductName: "",
      newProductEffects: "",
      newProductImageUrl: "",
      newProductDescription: "",
      errors: [],
      product: {},
      tags: [],
      tag: "",
      autocompleteItems: []
    };
  },
  created: function() {
    axios.get("/api/conditions/").then(response => {
      this.autocompleteItems = response.data.map(a => {
        return { text: a.name, id: a.id };
      });
      console.log(response.data);
    });
  },
  methods: {
    createProduct: function() {
      var params = {
        name: this.newProductName,
        effects: this.newProductEffects,
        image_url: this.newProductImageUrl,
        description: this.newProductDescription,
        condition_ids: this.tags.map(a => a.id)
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
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    }
  }
};
</script>
