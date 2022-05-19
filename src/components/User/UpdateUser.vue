<template>
  <vs-row>
    <vs-col w="2" class="m-5">
      <vs-card>
        <template #text>
          <h4 class="mb-1">50%</h4>
          <span>Yearly Sales</span>
          <vs-progress :percent="50" color="success">primary</vs-progress>
        </template>
      </vs-card>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "UpdateUser",
};
</script>