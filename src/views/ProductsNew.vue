<template>
  <div class="products-new">
    <div class="col-md-7 col-lg-8 col-xl-8">
      <div class="page-header bordered">
        <h1>
          New Product
        </h1>
      </div>
      <form action="index.php" v-on:submit.prevent="createProduct()">
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label for="title">Name</label>
          <input
            type="text"
            v-model="newProductName"
            class="form-control form-control-lg"
            id="title"
            placeholder="Name"
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="title">Effects</label>
          <input
            type="text"
            v-model="newProductEffects"
            class="form-control form-control-lg"
            id="title"
            placeholder="Effects"
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="title">Image Url</label>
          <input
            type="text"
            v-model="newProductImageUrl"
            class="form-control form-control-lg"
            id="title"
            placeholder="Image Url"
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="title">Description</label>
          <input
            type="text"
            v-model="newProductDescription"
            class="form-control form-control-lg"
            id="title"
            placeholder="Description"
            autofocus
          />
          <div>
            Treats:
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              :autocomplete-items="filteredItems"
              @tags-changed="newTags => (tags = newTags)"
            />
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-lg btn-primary">Submit Remedy</button>
        </div>
      </form>
    </div>
    <!-- <form v-on:submit.prevent="createProduct()">
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
    </form> -->
  </div>
</template>
b
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
