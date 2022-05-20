<template>
  <vs-row
    justify="center"
    align="top"
    v-if="
      (currentUser.role == LIBRARIAN_ROLE &&
        currentUser.library == profileUser.homeLibrary) ||
      currentUser.id === profileUser.id
    "
    ><vs-col w="10" class="m-4"><h3 class="card-title">Edit User</h3></vs-col>
    <vs-col w="4" class="m-5">
      <vs-card>
        <template #text>
          <form>
            <vs-row justify="center" align="top">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="nameInput"
                  placeholder="profileUser.name"
                  v-model="nameInput"
                />
                <label for="nameInput">Name</label>
              </div>
            </vs-row>
            <vs-row justify="center" align="top">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="emailInput"
                  placeholder="profileUser.email"
                  v-model="emailInput"
                />
                <label for="emailInput">Email</label>
              </div>
            </vs-row>
            <vs-row justify="center" align="top">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="homeLibraryInput"
                  placeholder="profileUser.homeLibrary"
                  v-model="homeLibraryInput"
                />
                <label for="homeLibraryInput">Home Library</label>
              </div>
            </vs-row>
            <vs-row justify="center" align="top">
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="passwordInput"
                  placeholder="profileUser.password"
                  v-model="passwordInput"
                  :disabled="currentUser.role === LIBRARIAN_ROLE"
                />
                <label for="passwordInput">Password</label>
              </div>
            </vs-row>
            <vs-row justify="center">
              <button
                class="btn btn-primary col-lg-2 d-inline"
                @click.prevent="updateUser(user_id)"
              >
                Update
              </button>
              <span style="padding: 15px"></span>
              <button
                class="btn btn-secondary col-lg-2 d-inline"
                @click="viewUser(user_id)"
              >
                Cancel
              </button>
            </vs-row>
          </form>
        </template>
      </vs-card>
    </vs-col>
    <vs-col w="3" class="m-5">
      <vs-card>
        <template #text>
          <vs-row>
            <vs-col w="11">
              <h4 class="mb-1">Loan Requests</h4>
            </vs-col>
            <vs-col v-if="profileUser.role !== LIBRARIAN_ROLE" w="1">
              <a @click="openLoanRequests(profileUser.id)"
                ><i class="bx bx-calendar-edit bx-lg"></i
              ></a>
            </vs-col>
          </vs-row>
          <vs-row>
            <div v-if="!profileUser.loanRequests.length">
              No active loan requests
            </div>
            <div
              v-else
              :key="index"
              v-for="(item, index) in profileUser.loanRequests"
            >
              {{index+1}}) {{ item.material.title }} - <span class="badge bg-primary">{{item.status}}</span>
            </div>
          </vs-row>
        </template>
      </vs-card>
    </vs-col>
    <vs-col w="3" class="m-5">
      <vs-card>
        <template #text>
          <vs-row>
            <vs-col w="11">
              <h4 class="mb-1">Extension Requests</h4>
            </vs-col>
            <vs-col v-if="profileUser.role !== LIBRARIAN_ROLE" w="1">
              <i class="bx bx-calendar-edit bx-lg"></i>
            </vs-col>
          </vs-row>
          <vs-row>
            <div v-if="!profileUser.extensionRequests.length">
              No active extension requests
            </div>
            <div
              v-else
              :key="index"
              v-for="(item, index) in profileUser.extensionRequests"
            >
              {{index+1}}) {{ item.material.title }} - From: {{ new Date(item.startDate).toLocaleTimeString("en-UK", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }} - To: {{ new Date(item.endDate).toLocaleTimeString("en-UK", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div></vs-row
          >
        </template>
      </vs-card>
    </vs-col>
  </vs-row>
  <vs-row v-else>
    <vs-col class="m-5">
      <h3>
        Looks like you reached this page by mistake! You can go back to the
        previous page by clicking &lArr;
      </h3>
    </vs-col>
  </vs-row>
</template>

<script>
import axios from "axios";

const currentUser = JSON.parse(window.localStorage.getItem("user"));
const token = window.localStorage.getItem("user-token");
const headers = {
  Authorization: "Basic " + token,
};

export default {
  name: "UpdateUser",
  props: ["user_id"],
  data() {
    return {
      LIBRARIAN_ROLE: process.env.VUE_APP_LIBRARIAN_ROLE,
      currentUser: currentUser,
      profileUser: {},
      nameInput: "",
      emailInput: "",
      homeLibraryInput: "",
      passwordInput: ""
    };
  },
  methods: {
    loadUser(id) {
      const loading = this.$vs.loading();

      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/user/${id}`, {
          headers,
        })
        .then((response) => {
          this.profileUser = response.data;
          this.nameInput = this.profileUser.name;
          this.emailInput = this.profileUser.email;
          this.homeLibraryInput = this.profileUser.homeLibrary;
          this.passwordInput = this.profileUser.password;
        })
        .catch((error) => {
          console.log(error);
        });

      loading.close();
    },
    updateUser(id) {
      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/user/${id}`, {
          headers,
        })
        .then((response) => {
          const userDetails = response.data;
          userDetails["name"] = this.nameInput;
          userDetails["email"] = this.emailInput;
          userDetails["homeLibrary"] = this.homeLibraryInput;

          axios
            .put(`${process.env.VUE_APP_API_BASE_URL}/user/${id}`,
              userDetails, {
              headers
            })
            .then(() => {
              this.$vs.notification({
                color: "success",
                position: "top-right",
                title: "Success",
                text: `${this.nameInput} successfully updated!`,
              });
            }).then(() => {
              this.viewUser(id);
            });
        })
        .catch((error) => {
          const status = error.response.status;
          const data = error.response.data;

          this.$vs.notification({
            color: "danger",
            position: "top-right",
            title: `Error ${status}`,
            text: data.message,
          });
        });
    },
    viewUser(id) {
      this.$router.push(`/user/view/${id}`);
    },
    openLoanRequests(id) {
      this.$router.push({
        name: "requests",
        params: { type: "loan", user_id: id },
      });
    },
    openExtensionRequests(id) {
      this.$router.push({
        name: "requests",
        params: { type: "extension", user_id: id },
      });
    },
  },
  beforeMount() {
    this.loadUser(this.user_id);
  },
};
</script>