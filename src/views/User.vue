<template>
  <div v-if="user.role == 'LIBRARIAN' && action == 'view'">
    <RetrieveUser :user_id="id" />
  </div>
  <div v-else-if="user.role == 'LIBRARIAN' && action == 'edit'">
    <UpdateUser />
  </div>
  <div v-else-if="user.role == 'LIBRARIAN' && action == 'delete'">
    <RetrieveUser :user_id="id" />
    <DeleteUser />
  </div>
  <div v-else>
    <CreateUser />
  </div>
</template>

<script>
import CreateUser from "../components/User/CreateUser.vue";
import RetrieveUser from "../components/User/RetrieveUser.vue";
import UpdateUser from "../components/User/UpdateUser.vue";
import DeleteUser from "../components/User/DeleteUser.vue";

export default {
  name: "UserView",
  data: function () {
    const currentUser = JSON.parse(window.localStorage.getItem("user"));

    return {
      user: currentUser,
      username: window.localStorage.getItem("username"),
      action: this.$route.params.action,
      id: this.$route.params.user_id,
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