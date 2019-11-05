<template>
  <div class="conditions-new">
    <form v-on:submit.prevent="createCondition()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="newConditionName" />
      Image URL:
      <input type="text" v-model="newConditionImageUrl" />
      Description:
      <input type="text" v-model="newConditionDescription" />

      <input type="text" value="select" list="products" v-model="product" />
      <input type="text" value="select" list="products" v-model="solutions[0]" />

      <input type="text" v-if="shownInputs > 0" id="products1" v-model="solutions[1]" list="products1" />

      <input type="text" v-if="shownInputs > 1" id="products1" v-model="solutions[2]" list="products2" />

      <input type="submit" value="Create Condition" />
    </form>

    <datalist id="products">
      <option v-for="product in products">{{ product.name }}</option>
    </datalist>
    <datalist id="products1">
      <option v-for="product in products">{{ product.name }}</option>
    </datalist>
    <datalist id="products2">
      <option v-for="product in products">{{ product.name }}</option>
    </datalist>
      <a v-on:click="shownInputs++">+</a>

    <datalist v-if="shownInputs > 0" id="products1" v-model="solutions[1]">
      <option v-for="product in products">{{ product.name }}</option>
    </datalist>
      <!-- <input type="submit" value="Create Condition" /> -->
    </form>
    {{ solutions }}
   <!--  <datalist id="products">
      <option v-for="product in products">{{ product.name }}</option>
    </datalist> -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      newConditionName: "",
      newConditionImageUrl: "",
      newConditionDescription: "",
      errors: [],
      condition: {},
      products: [],
      product: {},
      conditionId: "",
      shownInputs: 0,
      solutions: []
    };
  },
  created: function() {
    axios.get("/api/products/").then(response => {
      this.products = response.data;
      console.log(response.data);
    });
  },
  methods: {
    createCondition: function() {
      var paramsConditions = {
        name: this.newConditionName,
        image_url: this.newConditionImageUrl,
        description: this.newConditionDescription
      };
      var paramsSolutions = {
        product_id: this.product.id
      };
      axios
        .post("/api/conditions", paramsConditions)
        .then(response => {
          this.condition = response.data;
          this.conditionId = this.condition.id;
        })
        .catch(error => {
          console.log(error.response.data);
          this.errors = error.response.data.errors;
        });
      var paramsSolutions = {
        product_id: this.product.id,
        condition_id: this.conditionId
      };
      axios
        .post("/api/solutions", paramsSolutions)
        .then(response => {
          console.log(response.data);
          this.$router.push("/conditions/" + this.condition.id);
        })
        .catch(error => {
          console.log(error.response.data);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
