<template>
  <div class="conditions-new">
    <form v-on:submit.prevent="createcondition()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="newConditionName" />
      Image URL:
      <input type="text" v-model="newConditionImageUrl" />
      Description:
      <input type="text" v-model="newConditionDescription" />
      <input type="submit" value="Create Condition" />
    </form>
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
      condition: {}
    };
  },
  created: function() {},
  methods: {
    createcondition: function() {
      var params = {
        name: this.newConditionName,
        image_url: this.newConditionImageUrl,
        description: this.newConditionDescription
      };
      axios
        .post("/api/conditions", params)
        .then(response => {
          this.condition = response.data;
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
