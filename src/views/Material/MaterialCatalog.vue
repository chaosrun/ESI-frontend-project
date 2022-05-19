<template>
  <div>
    <vs-row justify="center" class="mt-5">
      <vs-col w="11" class="">
        <ViewMaterials />
      </vs-col>
    </vs-row>
  </div>  
</template>

<script>
import ViewMaterials from '../../components/Material/ViewMaterials'
export default {
  name: 'MaterialCatalog',
  data: function() {
    return {
    }
  },
  components: {
    ViewMaterials
  },
  methods: {
  }
}
</script>

<style></style>