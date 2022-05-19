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
                <vs-td class="row">
                    <vs-button
                        icon
                        v-if="user.role === 'LIBRARIAN'"
                        color="success"
                        flat
                        @click="openBorrower(tr, 'view')"
                        class="col-md-3"
                    >
                        <i class='bx bxs-zoom-in' ></i>
                    </vs-button>
                    <vs-button
                        icon
                        v-if="user.role === 'LIBRARIAN'"
                        color="primary"
                        flat
                        @click="openBorrower(tr, 'edit')"
                        class="col-md-3"
                    >
                        <i class='bx bxs-edit' ></i>
                    </vs-button>
                    <vs-button
                        icon
                        v-if="user.role === 'LIBRARIAN'"
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
    const currentUser = JSON.parse(window.localStorage.getItem("user"));

    return {
      active: "home",
      user: currentUser,
      borrowersList: [],
      token: '',
    };
  },
  methods: {
    setActiveMenu() {
      this.$emit("set-active-menu");
    },
    getBorrowers() {
      this.token = window.localStorage.getItem("user-token")
      const loading = this.$vs.loading();

      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/users/role/BORROWER`, {
          headers: {
            'Authorization': 'Basic ' + this.token
          },
        })
        .then(response => {
            response.data.forEach(borrower => {
                if (borrower.homeLibrary == this.user.library) {
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
  mounted() {
    this.getBorrowers();
  },
  name: "BorrowersList",
};
</script>