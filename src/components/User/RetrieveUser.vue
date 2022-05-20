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
            <vs-row>
              <div>Created on: {{ new Date(user.createdAt).toLocaleTimeString("en-UK", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
            </vs-row>
          </template>
        </vs-card>
      </vs-col>
      <vs-col w="7" class="m-5">
        <vs-card>
          <template #text>
            <vs-row>
              <h4 class="mp-1">Request History</h4>
            </vs-row>
            <vs-row>
              <h5 class="p-2">Loan Requests</h5>
            </vs-row>
            <vs-row>
              <div class="m-2">
                <div v-if="!user.loanRequests.length">
                  No active loan requests
                </div>
                <div
                  v-else
                  :key="index"
                  v-for="(item, index) in user.loanRequests"
                >
                
                  {{index+1}}) {{ item.material.title }} - <span class="badge bg-primary">{{item.status}}</span>
                </div>
              </div>
            </vs-row>
            <vs-row>
              <h5 class="p-2">Extension Requests</h5>
            </vs-row>
            <vs-row>
              <div class="m-2">
                <div v-if="!user.loanRequests.length">
                  No active extension requests
                </div>
                <div
                  v-else
                  :key="index"
                  v-for="(item, index) in user.extensionRequests"
                >
                  {{index+1}}) {{ item.material.title }} - From: {{ new Date(item.startDate).toLocaleTimeString("en-UK", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }} - To: {{ new Date(item.endDate).toLocaleTimeString("en-UK", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                </div>
              </div>
            </vs-row>
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
            <vs-row>
              <div>Created on: {{ new Date(user.createdAt).toLocaleTimeString("en-UK", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
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