<template>
  <div class="grid">
    <vs-row justify="center" align="center">
      <vs-col w="6">
        <div class="card mt-5">
          <div class="card-header">Create a Loan Request</div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="startDate" class="form-label">Start Date</label>
                <input
                  class="form-control"
                  id="startDate"
                  type="Date"
                  v-model="startDate"
                />
              </div>
              <div class="mb-3">
                <label for="endDate" class="form-label">End Date</label>
                <input
                  class="form-control"
                  id="endDate"
                  type="Date"
                  v-model="endDate"
                />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input
                  type="address"
                  class="form-control"
                  id="address"
                  v-model="address"
                />
              </div>
              <div class="mb-3">
                <label for="city" class="form-label">City</label>
                <input
                  type="city"
                  class="form-control"
                  id="city"
                  v-model="city"
                />
              </div>
              <div class="mb-3">
                <label for="zipCode" class="form-label">zipCode</label>
                <input
                  type="zipCode"
                  class="form-control"
                  id="zipCode"
                  v-model="zipCode"
                />
              </div>
              <a class="btn btn-primary" @click="create">Request</a>
            </form>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import router from "../../router";
import LoanRequestService from "../../services/LoanRequestService";

export default {
  name: "CreateLoanRequest",

  data: function () {
    return {
      materialId: null,
      startDate: null,
      endDate: null,
      address: null,
      city: null,
      zipCode: null,
    };
  },

  methods: {
    create: function () {
      const data = {
        materialId: this.materialId,
        startDate: this.startDate,
        endDate: this.endDate,
        address: this.address,
        city: this.city,
        zipCode: this.zipCode,
      };
      LoanRequestService.create(data)
        .then((response) => {
          router.push("/request/loan/" + response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
      this.materialId = this.$route.params.id;
  }
};
</script>

<style>
#app {
  margin-top: 100px;
}

.card {
  max-width: 500px;
  margin: auto;
}
</style>