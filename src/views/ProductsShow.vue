<template>
  <div class="products-show">
    <div class="products-show">
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
                          <div class="swiper-slide">
                            <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
                              <a href="img/demo/property/1.jpg" itemprop="contentUrl" data-size="2000x1414">
                                <img :src="product.image" class="img-fluid swiper-lazy" alt="Drawing Room" />
                              </a>
                            </figure>
                          </div>
                          <!--                  <img v-bind:src="product.image" v-bind:alt="product.name" /> -->
                        </div>
                      </div>
                    </div>
                    <div>
                      <ul class="item-features">
                        <li>
                          <h1>{{ product.name }}</h1>
                        </li>
                      </ul>
                      <div>
                        <div v-if="hasVote === true">
                          <button v-on:click="sendVote(1)"><i class="fa fa-thumbs-up"></i></button>
                          <button v-on:click="sendVote(-1)"><i class="fa fa-thumbs-down"></i></button>
                        </div>
                        <h2>Add Comment:</h2>
                        <input type="text" v-model="newCommentBody" />
                        <div v-on:click="createComment()">
                          <h2><i class="fa fa-comments"></i></h2>
                        </div>
                      </div>
                      <div class="item-description" v-for="comment in comments">
                        <p>
                          <strong>{{ comment.user }}</strong>
                          {{ comment.body }}
                          <i class="fa fa-trash-o" v-on:click="destroyComment(comment)"></i>
                        </p>
                      </div>
                      <h3 class="headline">Helps to Treat</h3>
                      <ul class="checked_list feature-list">
                        <div v-for="condition in product.conditions">
                          <li>
                            <router-link :to="`/conditions/${condition.id}`">{{ condition.name }}</router-link>
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
                                <h4>{{ product.description }}</h4>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card shadow">
                        <h5 class="subheadline mt-0  mb-0">Effects</h5>
                        <div class="media">
                          <div class="media-left">
                            <a href="agent.html">
                              <img
                                class="media-object rounded-circle"
                                src="img/demo/profile.jpg"
                                width="64"
                                height="64"
                                alt=""
                              />
                            </a>
                          </div>
                          <div class="media-body">
                            <h4 class="media-heading">
                              <a href="agent.html">{{ product.effects }}</a>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div class="card shadow">
                        <h5 class="subheadline mt-0  mb-0">Votes</h5>
                        <div class="media">
                          <div class="media-left">
                            <a href="agent.html">
                              <img
                                class="media-object rounded-circle"
                                src="img/demo/profile.jpg"
                                width="64"
                                height="64"
                                alt=""
                              />
                            </a>
                          </div>
                          <div class="media-body">
                            <h4 class="media-heading">
                              <a href="agent.html">
                                Total Upvotes: {{ product.upvotes }} Total Downvotes: {{ product.downvotes }}
                              </a>
                            </h4>
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
      product: {},
      newCommentBody: "",
      comments: [],
      votes: [],
      upvotes: [],
      hasVote: true
    };
  },
  created: function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      this.product = response.data;
      this.comments = response.data.comments;
      console.log(this.product);
    });
  },
  methods: {
    createComment: function() {
      var params = {
        body: this.newCommentBody,
        product_id: this.product.id
      };
      axios
        .post("/api/comments", params)
        .then(response => {
          this.comments.push(response.data);
          this.newCommentBody = "";
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyComment: function(comment) {
      axios.delete("/api/comments/" + comment.id).then(response => {
        var index = this.comments.indexOf(comment);
        this.comments.splice(index, 1);
      });
    },
    sendVote: function(value) {
      var params = {
        product_id: this.product.id,
        value: value
      };
      axios
        .post("/api/votes", params)
        .then(response => {
          console.log(response.data);
          if (value == 1) {
            this.product.upvotes++;
          } else {
            this.product.downvotes++;
          }

          this.hasVote = false;
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    calculateUpvotes: function() {
      //   this.upvotes = this.votes.filter(function(vote) {
      //     return vote.product_id === this.product.id;
      //   });
      //   console.log(this.upvotes);
      return this.votes[0];
    }
  }
};
</script>
