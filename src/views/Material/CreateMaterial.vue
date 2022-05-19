<template>
<div>
    <vs-row justify="center" class="mt-5">
      <vs-col w="11" class="">
        <AddMaterial />
      </vs-col>
    </vs-row>
  </div>  
</template>

<script>
import AddMaterial from '../../components/Material/AddMaterial'
export default {
  name: 'CreateMaterial',
  data: function() {
    return {
    }
  },
  components: {
    AddMaterial
  },
  methods: {
  }
}
</script>

<style></style>