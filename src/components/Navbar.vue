<template>
    <div class="center examplex">
      <vs-navbar square center-collapsed v-model="active" style="padding: 10px 15px;">
        <template #left>
          <vs-button @click="toggleMenu" flat icon>
            <i class='bx bx-menu'></i>
          </vs-button>
        </template>
        <template #right>
          <vs-button flat >Logout</vs-button>
           <vs-avatar>
                <img src="../assets/images/user-36-02.jpg" alt="">
            </vs-avatar>
        </template>
      </vs-navbar>
      <div class="square">
        <div class="child">
          child 1
        </div>
        <div class="child">
          child 2
        </div>
        <div class="child">
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    methods: {
        toggleMenu() {
            this.$emit('toggle-menu');
        }
    }
}
</script>