<template>
  <vs-row
    justify="center"
    align="top"
    v-if="
      (currentUser.role == 'LIBRARIAN' &&
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
                @click.prevent="loadUser(user_id)"
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
            <vs-col w="1">
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
              :key="item"
              v-for="(index, item) in profileUser.loanRequests"
            >
              {{ item.key }}
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
            <vs-col v-if="profileUser.role === 'BORROWER'" w="1">
              <a @click="openExtensionRequests(profileUser.id)"
                ><i class="bx bx-calendar-edit bx-lg"></i
              ></a>
            </vs-col>
          </vs-row>
          <vs-row>
            <div v-if="!profileUser.extensionRequests.length">
              No active extension requests
            </div>
            <div
              v-else
              :key="item"
              v-for="(index, item) in profileUser.extensionRequests"
            >
              {{ item.key }}
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

export default {
  name: "UpdateUser",
  props: ["user_id"],
  data() {
    return {
      currentUser: currentUser,
      profileUser: {},
      token: window.localStorage.getItem("user-token"),
      nameInput: "",
      emailInput: "",
      homeLibraryInput: "",
    };
  },
  methods: {
    loadUser(id) {
      const loading = this.$vs.loading();

      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/user/${id}`, {
          headers: {
            Authorization: "Basic " + this.token,
          },
        })
        .then((response) => {
          this.profileUser = response.data;
          this.nameInput = this.profileUser.name;
          this.emailInput = this.profileUser.email;
          this.homeLibraryInput = this.profileUser.homeLibrary;
        })
        .catch((error) => {
          console.log(error);
        });

      loading.close();
    },
    updateUser(id) {
      const userDetails = {
        homeLibrary: this.homeLibraryInput,
        email: this.emailInput,
        name: this.nameInput,
      };
      axios
        .put(`${process.env.VUE_APP_API_BASE_URL}/user/${id}`, userDetails, {
          headers: { Authorization: "Basic " + this.token },
        })
        .then((response) => {
          console.log(response);

          this.$vs.notification({
            color: "success",
            position: "top-right",
            title: "Success",
            text: `${this.nameInput} successfully updated!`,
          });
          this.$router.push({
            name: "user",
            params: { type: "view", user_id: id },
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