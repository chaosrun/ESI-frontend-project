<template>
  <div>
    <vs-row justify="center" class="mt-5">
      <vs-col w="11" class="">
        <LoanRequestList :user_id=1 />
      </vs-col>
    </vs-row>
  </div>  
</template>

<script>
import LoanRequestList from '../../components/Request/LoanRequestList'

export default {
  name: 'LoanRequestU',
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
