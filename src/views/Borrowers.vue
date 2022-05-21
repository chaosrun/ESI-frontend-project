<template>
  <div>
    <vs-row>
      <AddNewBorrower />  
    </vs-row>
    <vs-row justify="center" class="mt-5">
      <vs-col w="11" class="">
        <BorrowersList />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import BorrowersList from "../components/Dashboard/BorrowersList.vue";
import AddNewBorrower from "../components/User/AddNewBorrower.vue";

export default {
  name: "Borrowers",
  components: {
    BorrowersList,
    AddNewBorrower
  },
};
</script>