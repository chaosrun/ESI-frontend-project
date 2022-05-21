<template>
  <div>
    <vs-row justify="center" align="center">
      <vs-col w="4" class="m-5">
        <h5>Are you sure you want to delete the following account?</h5>
      </vs-col>
      <vs-col w="2" class="m-5">
          <span><vs-button color="danger" flat class="col-lg-2 d-inline" size="large" @click="deleteUser(user_id)">Yes</vs-button></span>
          <span><vs-button color="primary" flat class="col-lg-2 d-inline" size="large" @click="viewUser(user_id)">No</vs-button></span> 
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DeleteUser",
  data: function () {
    return {
      headers: {}
    }
  },
  props: ["user_id"],
  methods: {
    deleteUser(id) {
      const loading = this.$vs.loading();
  
      axios
        .delete(`${process.env.VUE_APP_API_BASE_URL}/user/${id}`, { headers: this.headers })
        .then(() => {
            this.$router.push({ name: 'borrowers' })
        })
        .catch((error) => {
          console.log(error);
        });

      loading.close();
    },
    viewUser() {
      this.$router.push({ name: 'borrowers' })
    }
  },
  beforeMount () {
    const token = window.localStorage.getItem("user-token");
    this.headers = {
      Authorization: "Basic " + token,
    };
  }
};
</script>