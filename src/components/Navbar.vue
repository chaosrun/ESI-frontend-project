<template>
    <div class="center examplex">
      <vs-navbar square center-collapsed v-model=active style="padding: 10px 15px;">
        <template #left>
          <vs-button @click="toggleMenu" flat icon>
            <i class='bx bx-menu'></i>
          </vs-button>
        </template>
        <template #right>
          <vs-button flat @click="handleLogout">Logout</vs-button>
           <vs-avatar>
                <img src="../assets/images/user-36-02.jpg" alt="">
            </vs-avatar>
        </template>
      </vs-navbar>
    </div>
</template>

<script>
export default {
    props: ['active'],
    name: "NavBar",
    methods: {
        toggleMenu() {
            this.$emit('toggle-menu');
        },
        handleLogout(){
          window.localStorage.clear();
          this.$router.push({name: 'login'});
        }
    }
}
</script>