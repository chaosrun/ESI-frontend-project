<template>
  <div>
    <vs-row justify="center" class="mt-5">
      <vs-col w="11" class="">
        <LoanRequestUnit />
      </vs-col>
    </vs-row>
  </div>  
</template>

<script>
import LoanRequestUnit from '../../components/Request/LoanRequestUnit'

export default {
  name: 'LoanRequest',
  data: function() {
    return {
    }
  },
  components: {
    LoanRequestUnit
  },
  methods: {
  }
}
</script>
