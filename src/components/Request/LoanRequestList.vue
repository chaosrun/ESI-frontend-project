<template>
  <div class="requests">
    <h1>All Loan Requests</h1>

    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Status</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in requests" :key="request.id">
          <th scope="row">{{ request.id }}</th>
          <td>{{ request.materialTitle }}</td>
          <td>{{ request.status }}</td>
          <td><a :href="'/request/loan/' + request.id">Details</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import auth from '@/components/auth.js';
import LoanRequestService from "../../services/LoanRequestService.js";

export default {
  name: "LoanRequest",
  data() {
    return {
      requests: [],
    };
  },
  methods: {
    getUserID() {
      console.log(auth.userID());
      return auth.userID();
    },
    getAllByUser(id) {
      LoanRequestService.getAllByUser(id)
        .then((response) => {
          this.requests = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getAllByUser(this.getUserID());
  }
};
</script>

<style scoped>
.requests {
  max-width: 800px;
  margin: auto;
  margin-top: 50px;
}
</style>
