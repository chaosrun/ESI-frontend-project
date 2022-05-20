<template>
    <div class="hidden">
      <vs-sidebar
        background="#1f293b"
        textWhite
        :open.sync="menuToggle"
        absolute
        v-model=active
        :square="true"
        >
        <template #logo>
          <h4>logo</h4>
        </template>
        <vs-sidebar-item id="home" to="/">
          <template #icon>
            <i class='bx bx-home'></i>
          </template>
          Home
        </vs-sidebar-item>
        <vs-sidebar-item id="market" to="/materials">
          <template #icon>
            <i class='bx bx-book'></i>
          </template>
          Materials
        </vs-sidebar-item>
        <vs-sidebar-item id="Music" to="/requests/loan">
          <template #icon>
            <i class='bx bxs-book-bookmark' ></i>
          </template>
          Loan Requests
        </vs-sidebar-item>
        <vs-sidebar-item v-if="user && user.role === librarian_role" id="borrowers" to="/borrowers">
          <template #icon>
            <i class='bx bxs-user-account' ></i>
          </template>
          Borrowers
        </vs-sidebar-item>
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar>
              <img src="../assets/images/user-36-02.jpg" alt="">
            </vs-avatar>

            <vs-avatar badge-color="danger" badge-position="top-right">
              <i class='bx bx-bell' style="color: black"></i>

              <template #badge>
                28
              </template>
            </vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>
    </div>
</template>

<script>
export default {
  data: () => {
    return {
      active: "home",
      user: {},
      librarian_role: process.env.VUE_APP_LIBRARIAN_ROLE,
      menuToggle: false
    }
  },
  props: ['menuOpen'],
  methods: {
        setActiveMenu() {
            this.$emit('set-active-menu');
        }
  },
  watch: {
    menuOpen: function(newVal) { // watch it
      this.menuToggle = newVal;
    },
    menuToggle: function(newVal) { // watch it
      if(newVal === false) {
        this.$emit('toggle-menu');
      }
    },
  },
  mounted () {
    const currentUser = JSON.parse(window.localStorage.getItem('user'));
    this.user = currentUser;
    this.menuToggle = this.menuOpen;
  }
}
</script>