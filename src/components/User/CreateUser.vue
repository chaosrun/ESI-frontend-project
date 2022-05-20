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

const currentUser = JSON.parse(window.localStorage.getItem("user"));
const token = window.localStorage.getItem("user-token");
const headers = {
  Authorization: "Basic " + token,
};
const password = Math.random().toString(36).slice(2, 10);

export default {
  name: "CreateUser",
  data() {
    return {
      currentUser: currentUser,
      nameInput: "",
      emailInput: "",
      password: password,
    };
  },
  methods: {
    createUser() {
      const userDetails = {
        homeLibrary: currentUser.library,
        email: this.emailInput,
        name: this.nameInput,
        password: password,
        role: "BORROWER",
      };

      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/user`, userDetails, {
          headers,
        })
        .then((response) => {
          console.log(response);

          this.$vs.notification({
            color: "primary",
            position: "top-center",
            title: "Borrower Account Created!",
            text: `Username: <strong>${this.emailInput}</strong><br/>Password: <strong>${password}</strong>`,
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
};
</script>