<template>
  <div>
    <vs-row justify="center" class="mt-5">
      <vs-col w="11" class="">
        <LoanRequestList />
      </vs-col>
    </vs-row>
  </div>  
</template>

<script>
import LoanRequestList from '../../components/Request/LoanRequestList'

export default {
  name: 'LoanRequest',
  data: function() {
    return {
    }
  },
  components: {
    LoanRequestList
  },
  methods: {
  }
}
</script>
