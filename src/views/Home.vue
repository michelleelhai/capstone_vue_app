<template>
  <div class="home">
    <div id="content">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col col-lg-12 col-xl-10">
            <div class="row has-sidebar">
              <div class="col-md-7 col-lg-8 col-xl-8">
                <nav aria-label="breadcrumb"></nav>
                <div class="page-header v2 bordered mb0">
                  <h1>
                    Natural Remedies for Every Day Ailments
                  </h1>
                </div>
                <div class="clearfix"></div>
                <div class="item-listing grid">
                  <div class="item item-lg">
                    <div class="item-image">
                      <a href="blog_single.html">
                        <img
                          src="https://cdn-prod.medicalnewstoday.com/content/images/hero/265/265990/265990_1100.jpg"
                          class="img-fluid"
                          alt=""
                        />
                      </a>
                    </div>
                    <h3 class="item-title">Ginger</h3>
                    <div class="item-excerpt">
                      A common household remedy that has been known to cure stomachaches and other digestive issues.
                    </div>
                  </div>
                  <div class="item item-lg">
                    <div class="item-image">
                      <a href="blog_single.html">
                        <img
                          src="https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555387974/shape/mentalfloss/istock_000034105814_small.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <h3 class="item-title">Honey</h3>
                    <div class="item-excerpt">
                      A natural sweetener known for its throat soothing properties.
                    </div>
                  </div>
                  <div class="item item-lg">
                    <div class="item-image">
                      <a href="blog_single.html">
                        <img
                          src="https://images.homedepot-static.com/productImages/0d319107-2d11-4f0e-bde1-71e5e3a43840/svn/gurney-s-fruit-plants-03176-64_1000.jpg"
                          class="img-fluid"
                          alt=""
                        />
                      </a>
                    </div>
                    <h3 class="item-title">Elderberry</h3>
                    <div class="item-excerpt">
                      A well-known berry used for treatment of the flue and the common cold.
                    </div>
                  </div>
                  <div class="item item-lg">
                    <div class="item-image">
                      <a href="blog_single.html">
                        <img
                          src="http://images.ctfassets.net/3s5io6mnxfqz/1JuXh32QVC83RIpDDmj7S1/fe0e6247d5fecb8f6e221abe1771d6d1/AdobeStock_172563501.jpeg"
                          class="img-fluid"
                          alt=""
                        />
                      </a>
                    </div>
                    <h3 class="item-title">Cinnamon</h3>
                    <div class="item-excerpt">
                      A commonly used product to help control blood sugar in diabetics.
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-5 col-lg-4 col-xl-4 col-sidebar">
                <div id="sidebar" class="sidebar-right">
                  <div class="sidebar_inner">
                    <h3 class="subheadline">Post Something!</h3>
                    <div class="list-group no-border">
                      <router-link to="/products/new" class="list-group-item active">New Remedy</router-link>
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
export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!"
    };
  },
  created: function() {},
  methods: {}
};
</script>
