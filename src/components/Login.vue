<template>
  <div class="grid">
    <vs-row justify="center" align="center">
      <vs-col w="6">
        <div class="card mt-5">
          <div class="card-header">Sign In</div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                />
              </div>
              <a class="btn btn-primary" @click="login">Log in</a>
            </form>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import auth from "./auth";

export default {
  name: "Login",

  data: function () {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login: function () {
      auth.login(this, this.email, this.password);
    },
  },
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