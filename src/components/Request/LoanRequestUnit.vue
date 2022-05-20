<template>
  <div class="requests">
    <h1>Loan Request Details</h1>

    <table class="table mt-5">
      <tr>
        <th>ID:</th>
        <td>{{ request.id }}</td>
      </tr>
      <tr>
        <th>Material Title:</th>
        <td>{{ request.materialTitle }}</td>
      </tr>
      <tr>
        <th>Material Callnumber:</th>
        <td>{{ request.materialCallNumber }}</td>
      </tr>
      <tr>
        <th>Material Home Library:</th>
        <td>{{ request.materialHomeLibrary }}</td>
      </tr>
      <tr>
        <th>Start Date:</th>
        <td>{{ request.startDate }}</td>
      </tr>
      <tr>
        <th>End Date:</th>
        <td>{{ request.endDate }}</td>
      </tr>
      <tr>
        <th>Status:</th>
        <td>{{ request.status }}</td>
      </tr>
      <tr>
        <th>Location Address:</th>
        <td>{{ request.locationAddress }}</td>
      </tr>
      <tr>
        <th>Location City:</th>
        <td>{{ request.locationCity }}</td>
      </tr>
      <tr>
        <th>Operations:</th>
        <td>
          <button
            v-if="request.status === 'REQUESTED'"
            class="btt"
            @click="update(request.id, { status: 'CANCELLED' })"
          >
            Cancel
          </button>
          <button v-else class="btt" disabled>Cancel</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import LoanRequestService from "../../services/LoanRequestService.js";

export default {
  name: "LoanRequest",
  data() {
    return {
      request: {
        id: null,
        materialTitle: null,
        materialCallNumber: null,
        materialHomeLibrary: null,
        startDate: null,
        endDate: null,
        status: null,
        localtionAddress: null,
        locationCity: null,
      },
    };
  },
  methods: {
    get(id) {
      LoanRequestService.get(id)
        .then((response) => {
          this.request = response.data;
        })
        .catch((error) => {
          console.log(error);
          alert("Error: " + error);
        });
    },
    update(id, data) {
      LoanRequestService.update(id, data)
        .then((response) => {
          this.request = response.data;
        })
        .catch((error) => {
          console.log(error);
          alert("Error: " + error);
        });
    },
  },
  mounted() {
    this.get(this.$route.params.id);
  },
};
</script>

<style scoped>
.requests {
  max-width: 800px;
  margin: auto;
  margin-top: 50px;
}

tr {
  border-color: #ccc !important;
}

.btt {
  border: 1px solid #333;
  margin-left: -5px;
}
</style>
