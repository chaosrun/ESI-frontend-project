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
        <th>Actions:</th>
        <td>
          <button
            v-if="
              request.status === 'REQUESTED' && currentUserRole === 'BORROWER'
            "
            class="btt"
            @click="update(request.id, { status: 'CANCELLED' })"
          >
            Cancel
          </button>
          <button v-else-if="currentUserRole === 'BORROWER'" class="btt" disabled>
            Cancel
          </button>
          <button
            v-if="
              request.status === 'REQUESTED' && currentUserRole === 'LIBRARIAN' && request.materialHomeLibrary === currentUserHomeLibrary
            "
            class="btt"
            @click="update(request.id, { status: 'APPROVED' })"
          >
            Approve
          </button>
          <button
            v-if="
              (request.status !== 'REQUESTED' || request.materialHomeLibrary !== currentUserHomeLibrary) && currentUserRole === 'LIBRARIAN'
            "
            class="btt"
            disabled
          >
            Approve
          </button>
          <span></span>
          <button
            v-if="
              request.status === 'REQUESTED' && currentUserRole === 'LIBRARIAN' && request.materialHomeLibrary === currentUserHomeLibrary
            "
            class="btt"
            @click="update(request.id, { status: 'REJECTED' })"
          >
            Reject
          </button>
          <button
            v-if="
              (request.status !== 'REQUESTED' || request.materialHomeLibrary !== currentUserHomeLibrary) && currentUserRole === 'LIBRARIAN'
            "
            class="btt"
            disabled
          >
            Reject
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import LoanRequestService from "../../services/LoanRequestService.js";
// import ReservationService from "../../services/ReservationService.js";

export default {
  name: "LoanRequest",
  data() {
    return {
      request: {
        id: null,
        userId: null,
        materialId: null,
        materialTitle: null,
        materialCallNumber: null,
        materialHomeLibrary: null,
        startDate: null,
        endDate: null,
        status: null,
        localtionAddress: null,
        locationCity: null,
      },
      currentUserRole: "",
      currentUserHomeLibrary: "",
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
    //   if (data.status === "APPROVED") {
    //     ReservationService.create({
    //       startDate: this.request.startDate,
    //       endDate: this.request.endDate,
    //       status: "APPROVED",
    //       userId: this.request.userId,
    //       materialId: this.request.materialId,
    //     })
    //       .then((response) => {
    //         this.request = response.data;
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         alert(error);
    //       });
    //   }
    },
  },
  mounted() {
    this.get(this.$route.params.id);
    const user = window.localStorage.getItem("user");
    const userInformation = JSON.parse(user);
    this.currentUserRole = userInformation.role;
    this.currentUserHomeLibrary = userInformation.library;
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
