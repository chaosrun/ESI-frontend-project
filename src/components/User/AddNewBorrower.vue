<template>
  <vs-row justify="end">
    <vs-col offset="10" w="2" class="mb-2">
      <vs-button flat @click="createUser" size="xl">
        <i class="bx bx-add-to-queue"></i>&nbsp;&nbsp;Add New Borrower
      </vs-button>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: "AddNewBorrower",
  methods: {
    createUser() {
      this.$router.push({ name: "user", params: { action: "create" } });
    },
  },
};
</script>
