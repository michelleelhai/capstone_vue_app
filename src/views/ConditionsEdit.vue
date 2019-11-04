<template>
  <div class="conditions-edit">
    <h1>Edit Condition</h1>
    <form v-on:submit.prevent="updateCondition">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="condition.name" />
      Description:
      <input type="text" v-model="condition.description" />
      Image_url:
      <input type="text" v-model="condition.image_url" />
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
      condition: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/api/conditions/" + this.$route.params.id).then(response => {
      this.condition = response.data;
    });
  },
  methods: {
    updateCondition: function(condition) {
      var params = {
        name: condition.name,
        description: condition.description,
        image_url: condition.image_url
      };
      axios
        .patch("/api/conditions/" + this.condition.id, params)
        .then(response => {
          this.$router.push("/conditions/" + this.condition.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
