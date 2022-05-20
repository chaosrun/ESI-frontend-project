<template>
  <div class="requests">
    <h1>All Loan Requests</h1>

    <ul>
      <p class="item" v-for="request in requests" :key="request.id">
        <a class="singleplant" :href="'/aplant/' + request.id">
          <span class="id"> <b>ID:</b> {{ request.id }} </span><br />
        </a>
      </p>
    </ul>
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
