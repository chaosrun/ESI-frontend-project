<template>
  <div v-if="action == 'edit'">
    <UpdateUser :user_id="id" />
  </div>
  <div v-else-if="currentUser.role == LIBRARIAN_ROLE && action == 'create'">
    <CreateUser />
  </div>
  <div v-else-if="currentUser.role == LIBRARIAN_ROLE && action == 'delete'">
    <DeleteUser :user_id="id" />
    <RetrieveUser :user_id="id" />
  </div>
  <div v-else>
    <RetrieveUser :user_id="id" />
  </div>
</template>

<script>
import CreateUser from "../components/User/CreateUser.vue";
import RetrieveUser from "../components/User/RetrieveUser.vue";
import UpdateUser from "../components/User/UpdateUser.vue";
import DeleteUser from "../components/User/DeleteUser.vue";

const currentUser = JSON.parse(window.localStorage.getItem("user"));

export default {
  name: "UserView",
  data: function () {
    const id = this.$route.params.user_id;

    return {
      LIBRARIAN_ROLE: process.env.VUE_APP_LIBRARIAN_ROLE,
      currentUser: currentUser,
      action: this.$route.params.action,
      id: id ? id : currentUser.id,
    };
  },
  components: {
    CreateUser,
    RetrieveUser,
    UpdateUser,
    DeleteUser,
  },
  methods: {},
};
</script>

<style></style>