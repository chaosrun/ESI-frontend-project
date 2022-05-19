<template>
  <div v-if="user.role == 'BORROWER'">
    <vs-row justify="center" align="top">
      <vs-col w="3" class="m-5">
        <vs-card>
          <template #text>
            <vs-row>
              <vs-col w="11">
                <h4 class="mb-1">{{ user.name }}</h4>
              </vs-col>
              <vs-col w="1">
                <i class="bx bx-book-reader bx-lg"></i>
              </vs-col>
            </vs-row>
            <vs-row>
              <div>{{ user.email }}</div>
            </vs-row>
            <vs-row>
              <div>Home Library: {{ user.homeLibrary }}</div>
            </vs-row>
          </template>
        </vs-card>
      </vs-col>
      <vs-col w="7" class="m-5">
        <vs-card>
          <template #text>
            <h4 class="mb-1">Active Requests</h4>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
  <div v-else>
    <vs-row justify="center" align="top">
      <vs-col w="6" class="m-5">
        <vs-card>
          <template #text>
            <vs-row>
              <vs-col w="11">
                <h4 class="mb-1">{{ user.name }}</h4>
              </vs-col>
              <vs-col w="1">
                <i class="bx bx-library bx-lg"></i>
              </vs-col>
            </vs-row>
            <vs-row>
              <div>{{ user.email }}</div>
            </vs-row>
            <vs-row>
              <div>Home Library: {{ user.homeLibrary }}</div>
            </vs-row>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RetrieveUser",
  data: function () {
    console.log(this.user_id);

    return {
      user: {},
      token: window.localStorage.getItem("user-token"),
    };
  },
  props: ["user_id"],
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
          this.user = response.data;

          console.log(this.user);
        })
        .catch((error) => {
          console.log(error);
        });

      loading.close();
    },
  },
  mounted() {
    this.loadUser(this.user_id);
  },
};
</script>