<template>
  <div class="table-responsive">
    <vs-table class="bg-white">
        <template #thead class="bg-white">
            <vs-tr>
                <vs-th>
                    User ID
                </vs-th>
                <vs-th>
                    Name
                </vs-th>
                <vs-th>
                    E-mail Address
                </vs-th>
                <vs-th>
                    Date Created
                </vs-th>
                <vs-th>
                    Actions
                </vs-th>
            </vs-tr>
        </template>
        <template #tbody>
            <vs-tr
            :key="i"
            v-for="(tr, i) in borrowersList"
            :data="tr"
            >
                <vs-td>
                    {{ tr.id }}
                </vs-td>
                <vs-td>
                    {{ tr.name }}
                </vs-td>
                <vs-td>
                    {{ tr.email }}
                </vs-td>
                <vs-td>
                    {{ new Date(tr.createdAt).toLocaleTimeString("en-UK", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                </vs-td>
                <vs-td class="row">
                    <vs-button
                        icon
                        v-if="currentUser.role === LIBRARIAN_ROLE"
                        color="success"
                        flat
                        @click="openBorrower(tr, 'view')"
                        class="col-md-3"
                    >
                        <i class='bx bxs-zoom-in' ></i>
                    </vs-button>
                    <vs-button
                        icon
                        v-if="currentUser.role === LIBRARIAN_ROLE"
                        color="primary"
                        flat
                        @click="openBorrower(tr, 'edit')"
                        class="col-md-3"
                    >
                        <i class='bx bxs-edit' ></i>
                    </vs-button>
                    <vs-button
                        icon
                        v-if="currentUser.role === LIBRARIAN_ROLE"
                        color="danger"
                        flat
                        @click="openBorrower(tr, 'delete')"
                        class="col-md-3"
                    >
                        <i class='bx bxs-trash' ></i>
                    </vs-button>
                </vs-td>
            </vs-tr>
        </template>
    </vs-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => {

    return {
      active: "home",
      LIBRARIAN_ROLE: process.env.VUE_APP_LIBRARIAN_ROLE,
      currentUser: {},
      headers:{},
      borrowersList: [],
    };
  },
  methods: {
    setActiveMenu() {
      this.$emit("set-active-menu");
    },
    getBorrowers() {
      const loading = this.$vs.loading();

      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/users/role/BORROWER`, {
          headers: this.headers
        })
        .then(response => {
            response.data.forEach(borrower => {
                if (borrower.homeLibrary == this.currentUser.library) {
                    this.borrowersList.push(borrower)
                }
            });
        })
        .catch((error) => {
          console.log(error);
        });
      
      loading.close();
    },
    openBorrower(user, action) {
      this.$router.push({ name: 'user', params: { action: action, user_id: user.id } })
    }
  },
  beforeMount() {
    this.currentUser = JSON.parse(window.localStorage.getItem("user"));
    const token = window.localStorage.getItem("user-token");
    this.headers = {
      Authorization: "Basic " + token,
    };
    this.getBorrowers();
  },
  name: "BorrowersList",
};
</script>