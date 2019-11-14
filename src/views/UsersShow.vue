<template>
  <div class="user-show">
    <!-- <h1>{{ user.username }}'s Products</h1> -->
    <!--    <div v-for="condition in user.conditions">
      <h2>
        <router-link :to="`/conditions/${condition.id}`">{{ condition.name }}</router-link>
        <button v-on:click="destroyCondition(condition)"></button>
        <router-link :to="`/conditions/${condition.id}/edit`">Edit condition</router-link>
      </h2>
    </div>
 -->
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-12 col-xl-10">
          <div class="page-header">
            <h1>{{ user.username }}'s Products</h1>
          </div>
        </div>
      </div>
    </div>

    <div id="content">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col col-lg-12 col-xl-10">
            <div class="row has-sidebar">
              <div class="col-md-12">
                <div class="clearfix"></div>
                <div class="item-listing grid">
                  <div class="row">
                    <div class="col-lg-6" v-for="product in user.products">
                      <div class="item">
                        <div class="item-image">
                          <router-link :to="`/products/${product.id}`">
                            <img :src="product.image" class="img-fluid" alt="" />
                            <div class="item-meta">
                              <div class="item-price">
                                {{ product.name }}
                              </div>
                            </div>
                            <div class="item-badges">
                              <div class="item-badge-right">
                                <router-link style="color:white" :to="`/products/${product.id}/edit`">Edit</router-link>
                              </div>
                            </div>
                          </router-link>
                          <a href="#" class="save-item">
                            <i class="fa fa-trash-o" v-on:click="destroyProduct(product)"></i>
                          </a>
                        </div>
                        <div class="item-info">
                          <h3 class="item-title">Effecs: {{ product.effects }}</h3>
                          <div class="item-location">
                            {{ product.description }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      errors: [],
      conditions: [],
      products: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      this.products = response.data.products;
      this.conditions = response.data.conditions;
      console.log(this.products);
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
