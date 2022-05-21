<template>
  <div>
    <vs-row justify="center">
      <vs-col w="5" class="m-5">
        <vs-card>
          <template #text>
            <form>
              <vs-row justify="center" align="top">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="role"
                    value="BORROWER"
                    :disabled="true"
                  />
                  <label for="role">Role</label>
                </div>
              </vs-row>
              <vs-row justify="center" align="top">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="nameInput"
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
                    v-model="emailInput"
                  />
                  <label for="emailInput">Email</label>
                </div>
              </vs-row>
              <vs-row justify="center" align="top">
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    :disabled="true"
                  />
                  <label for="password">Password</label>
                </div>
              </vs-row>
              <p></p>
              <vs-row justify="center" align="top">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="homeLibrary"
                    :value="currentUser.library"
                    :disabled="true"
                  />
                  <label for="homeLibrary">Home Library</label>
                </div>
              </vs-row>
              <vs-row justify="center">
                <button
                  class="btn btn-primary col-lg-2 d-inline"
                  @click.prevent="createUser()"
                >
                  Save
                </button>
                <span style="padding: 15px"></span>
                <button
                  class="btn btn-secondary col-lg-2 d-inline"
                  @click="goToHome"
                >
                  Cancel
                </button>
              </vs-row>
            </form>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateUser",
  data() {
    return {
      currentUser: {},
      nameInput: "",
      emailInput: "",
      password: '',
      headers: {}
    };
  },
  methods: {
    createUser() {
      const userDetails = {
        homeLibrary: this.currentUser.library,
        email: this.emailInput,
        name: this.nameInput,
        password: this.password,
        role: "BORROWER",
      };

      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/user`, userDetails, this.headers)
        .then((response) => {

          this.$vs.notification({
            color: "primary",
            position: "top-center",
            title: "Borrower Account Created!",
            text: `Username: <strong>${response.data.email}</strong><br/>Password: <strong>${this.password}</strong>`,
            time: 10000,
          });

          this.$router.push({ name: "borrowers" }).catch(() => {});
        })
        .catch((error) => {
          const status = error.response.status;
          var message = error.response.data.message;

          if (error.code == "ERR_BAD_REQUEST") {
            message = "Check your input and try again!";
          }

          this.$vs.notification({
            color: "danger",
            position: "top-right",
            title: `Error ${status}`,
            text: message,
          });
        });
    },
    goToHome() {
      this.$router.push({ name: "borrowers" }).catch(() => {});
    },
  },
  mounted () {
    this.currentUser = JSON.parse(window.localStorage.getItem("user"));
    const token = window.localStorage.getItem("user-token");
    this.headers = {
      Authorization: "Basic " + token,
    };
    this.password = Math.random().toString(36).slice(2, 10);
  }
};
</script>