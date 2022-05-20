<template>
  <div>
    <vs-row justify="center" class="mt-5">
      <vs-col w="11" class="">
        <BorrowersList />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import BorrowersList from "../components/Dashboard/BorrowersList.vue";

export default {
  name: "Borrowers",
  components: {
    BorrowersList,
  },
};
</script>