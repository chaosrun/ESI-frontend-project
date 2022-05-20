<template>
  <div :class="user_id ? 'requests-inner' : 'requests'">
    <h1 v-if="!user_id">All Loan Requests</h1>

    <!-- Tab links -->
    <div class="tab" v-if="!user_id && currentUserRole !== 'BORROWER'">
      <button class="tablinks" @click="showAll" :class="{ active: isAll }">
        All
      </button>
      <button
        class="tablinks"
        @click="showPending"
        :class="{ active: isPending }"
      >
        Pending
      </button>
      <button
        class="tablinks"
        @click="showApproved"
        :class="{ active: isApproved }"
      >
        Approved
      </button>
      <button
        class="tablinks"
        @click="showOthers"
        :class="{ active: isOthers }"
      >
        Other Libraries
      </button>
    </div>
    <div class="requests-non" v-if="filterMaterialsByHomeLibrary.length === 0">
      No requests
    </div>
    <table class="table mt-5" v-if="filterMaterialsByHomeLibrary.length > 0">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Status</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in filterMaterialsByHomeLibrary" :key="request.id">
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
import auth from "@/components/auth.js";
import LoanRequestService from "../../services/LoanRequestService.js";

export default {
  name: "LoanRequest",
  props: ["user_id"],
  data() {
    return {
      requests: [],
      currentUserRole: "",
      currentUserHomeLibrary: "",
      isAll: true,
      isPending: false,
      isApproved: false,
      isOthers: false,
    };
  },
  computed: {
    filterMaterialsByHomeLibrary: function () {
      if (this.currentUserRole === "LIBRARIAN" && !this.isOthers) {
        return this.requests.filter(
          (request) =>
            request.materialHomeLibrary === this.currentUserHomeLibrary
        );
      } else if (this.currentUserRole == "LIBRARIAN" && this.isOthers) {
        return this.requests.filter(
          (request) =>
            request.materialHomeLibrary !== this.currentUserHomeLibrary
        );
      } else {
        return this.requests;
      }
    },
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
    getAll() {
      if (this.isAll || this.isOthers) {
        LoanRequestService.getAll()
          .then((response) => {
            this.requests = response.data;
          })
          .catch((error) => {
            this.isAll = false;
            if (error.response.status === 404) {
              console.log(error);
            } else {
              alert(error);
            }
          });
      } else if (this.isPending) {
        LoanRequestService.getAllByStatus("REQUESTED")
          .then((response) => {
            this.requests = response.data;
          })
          .catch((error) => {
            console.log(error);
            this.isPending = false;
            if (error.response.status === 404) {
              console.log(error);
            } else {
              alert(error);
            }
          });
      } else if (this.isApproved) {
        LoanRequestService.getAllByStatus("APPROVED")
          .then((response) => {
            this.requests = response.data;
          })
          .catch((error) => {
            console.log(error);
            this.isApproved = false;
            if (error.response.status === 404) {
              console.log(error);
            } else {
              alert(error);
            }
          });
      }
    },
    showAll() {
      this.isAll = true;
      this.isPending = false;
      this.isApproved = false;
      this.isOthers = false;
      this.getAll();
    },
    showPending() {
      this.isAll = false;
      this.isPending = true;
      this.isApproved = false;
      this.isOthers = false;
      this.getAll();
    },
    showApproved() {
      this.isAll = false;
      this.isPending = false;
      this.isApproved = true;
      this.isOthers = false;
      this.getAll();
    },
    showOthers() {
      this.isAll = false;
      this.isPending = false;
      this.isApproved = false;
      this.isOthers = true;
      this.getAll();
    },
  },
  mounted() {
    const user = window.localStorage.getItem("user");
    const userInformation = JSON.parse(user);
    this.currentUserRole = userInformation.role;

    if (
      this.currentUserRole === process.env.VUE_APP_LIBRARIAN_ROLE &&
      this.user_id
    ) {
      this.getAllByUser(this.getUserID());
    } else if (this.currentUserRole === process.env.VUE_APP_LIBRARIAN_ROLE) {
      this.getAll();
    } else {
      this.getAllByUser(this.getUserID());
    }
  },
};
</script>

<style scoped>
.requests {
  max-width: 800px;
  margin: auto;
  margin-top: 50px;
}

.requests-inner {
  max-width: 800px;
  margin: auto;
  margin-top: -10px;
  width: 100%;
}

.requests-non {
  margin-top: 30px;
  margin-left: 5px;
  font-size: 20px;
  font-weight: 400;
}

/* Style the tab */
.tab {
  margin-top: 40px;
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}
</style>
