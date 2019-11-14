<template>
  <div class="conditions-show">
    <div id="content" class="item-single">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col col-md-12 col-lg-12 col-xl-10">
            <div class="row row justify-content-md-center has-sidebar">
              <div class="col-md-7 col-lg-8">
                <div>
                  <div class="item-gallery">
                    <div class="swiper-container gallery-top" data-pswp-uid="1">
                      <div class="swiper-wrapper lazyload">
                        <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
                          <a href="img/demo/property/1.jpg" itemprop="contentUrl" data-size="2000x1414">
                            <img :src="condition.image" class="img-fluid swiper-lazy" alt="Drawing Room" />
                          </a>
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ul class="item-features">
                      <li>
                        <h1>{{ condition.name }}</h1>
                      </li>
                    </ul>

                    <h3 class="headline">Treat With</h3>
                    <ul class="checked_list feature-list">
                      <div v-for="product in condition.products">
                        <li>
                          <router-link :to="`/products/${product.id}`">{{ product.name }}</router-link>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-5 col-lg-4">
                <div id="sidebar" class="sidebar-right">
                  <div class="sidebar_inner">
                    <div id="feature-list" role="tablist">
                      <div class="card">
                        <div class="card-header" role="tab" id="headingOne">
                          <h4 class="panel-title">
                            <a
                              role="button"
                              data-toggle="collapse"
                              href="#specification"
                              aria-expanded="true"
                              aria-controls="specification"
                            >
                              Description
                              <i class="fa fa-caret-down float-right"></i>
                            </a>
                          </h4>
                        </div>
                        <div id="specification" class="panel-collapse collapse show" role="tabpanel">
                          <div class="card-body">
                            <table class="table v1">
                              <h4>{{ condition.description }}</h4>
                            </table>
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
    <!-- <img v-bind:src="condition.image" v-bind:alt="condition.name" />
    <h1>{{ condition.name }}</h1>
    <h2>{{ condition.description }}</h2>
    <h1>Treated with</h1>
    <div v-for="product in condition.products">
      <h2>
        <router-link :to="`/products/${product.id}`">{{ product.name }}</router-link>
      </h2>
    </div> -->
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
