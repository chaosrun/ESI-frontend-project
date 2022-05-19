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
                <vs-td>

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
      currentUser: currentUser,
      borrowersList: [],
    };
  },
  methods: {
    setActiveMenu() {
      this.$emit("set-active-menu");
    },
    getBorrowers() {
      const token = window.localStorage.getItem("user-token")
      
      axios
        .get(`${process.env.VUE_APP_API_BASE_URL}/users/role/BORROWER`, {
          headers: {
            'Authorization': 'Basic ' + token
          },
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
    },
  },
  mounted() {
    this.getBorrowers();
  },
  name: "BorrowersList",
};
</script>