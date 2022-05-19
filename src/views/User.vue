<script>
export default {
  name: 'UserView',
  data: function() {
    const currentUser = JSON.parse(window.localStorage.getItem('user'));

    return {
      user: currentUser,
      username: window.localStorage.getItem('username'),
    }
  },
  components: {

  },
  methods: {
    
  }
}
</script>

<style></style>