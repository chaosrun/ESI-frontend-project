<template>
  <vs-row justify="center" align="top">
    <vs-col w="3" class="m-5">
      <vs-card>
        <template #text>
          <vs-row>
            <vs-col w="11">
              <h4 class="mb-1">{{ userProfile.name }}</h4>
            </vs-col>
            <vs-col w="1">
              <i class="bx bx-book-reader bx-lg"></i>
            </vs-col>
          </vs-row>
          <vs-row>
            <div>{{ userProfile.email }}</div>
          </vs-row>
          <vs-row>
            <div>Home Library: {{ userProfile.homeLibrary }}</div>
          </vs-row>
          <vs-row>
            <div>
              Created on:
              {{
                new Date(userProfile.createdAt).toLocaleTimeString("en-UK", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </div>
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
              <div v-if="!userProfile.loanRequests.length">
                No active loan requests
              </div>
              <div
                v-else
                :key="item"
                v-for="(index, item) in userProfile.loanRequests"
              >
                {{ item.key }}
              </div>
            </div>
          </vs-row>
          <vs-row>
            <h5 class="p-2">Extension Requests</h5>
          </vs-row>
          <vs-row>
            <div class="m-2">
              <div v-if="!userProfile.loanRequests.length">
                No active extension requests
              </div>
              <div
                v-else
                :key="item"
                v-for="(index, item) in userProfile.extensionRequests"
              >
                {{ item.key }}
              </div>
            </div>
          </vs-row>
        </template>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import axios from "axios";
import LoanRequestList from "../../components/Request/LoanRequestList";

const currentUser = JSON.parse(window.localStorage.getItem("user"));
const token = window.localStorage.getItem("user-token");
const headers = {
  Authorization: "Basic " + token,
};

export default {
  name: "RetrieveUser",
  components: {
    LoanRequestList
  },
  data: function () {
    return {
      currentUser: currentUser,
      userProfile: {
        loanRequests: [],
        extensionRequests: [],
      },
    };
  },
  props: ["user_id"],
  methods: {
    loadUser(id) {
      const loading = this.$vs.loading();

      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/user/${id}`, {
          headers,
        })
        .then((response) => {
          this.userProfile = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      loading.close();
    },
  },
  created() {
    this.loadUser(this.user_id);
  },

};
</script>