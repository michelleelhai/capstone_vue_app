<template>
  <div class="products-edit">
    {{ product.name }}
    <div class="col-md-7 col-lg-8 col-xl-8">
      <div class="page-header bordered">
        <h1>
          Edit Product
        </h1>
      </div>
      <form action="index.php" v-on:submit.prevent="updateProduct()">
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            v-model="product.name"
            class="form-control form-control-lg"
            id="name"
            placeholder="Name"
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="effects">Effects</label>
          <input
            type="text"
            v-model="product.effects"
            class="form-control form-control-lg"
            id="effects"
            placeholder="Effects"
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="image">Image Url</label>
          <input
            type="text"
            v-model="product.image"
            class="form-control form-control-lg"
            id="image"
            placeholder="Image Url"
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            type="text"
            v-model="product.description"
            class="form-control form-control-lg"
            id="description"
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
          <button type="submit" class="btn btn-lg btn-primary">Submit</button>
        </div>
      </form>
    </div>
    <!--     <h1>Edit Product</h1>
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
      product: {},
      errors: [],
      tags: [],
      tag: "",
      autocompleteItems: []
    };
  },
  created: function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      this.product = response.data;
    });
    axios.get("/api/conditions/").then(response => {
      this.autocompleteItems = response.data.map(a => {
        return { text: a.name, id: a.id };
      });
      console.log(response.data);
    });
  },
  methods: {
    updateProduct: function(product) {
      var params = {
        name: this.product.name,
        description: this.product.description,
        image_url: this.product.image,
        effects: this.product.effects,
        condition_ids: this.tags.map(a => a.id)
      };
      axios
        .patch("/api/products/" + this.product.id, params)
        .then(response => {
          this.$router.push("/products/" + this.product.id);
        })
        .catch(error => {
          console.log(error.response.data);
          this.errors = error.response.data.errors;
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
