<template>
    <div class="hidden">
      <vs-sidebar
        background="#1f293b"
        textWhite
        :open.sync="menuOpen"
        absolute
        v-model=active
        :square=true
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
            <i class='bx bx-grid-alt'></i>
          </template>
          Materials
        </vs-sidebar-item>
        <vs-sidebar-item id="Music">
          <template #icon>
            <i class='bx bxs-music'></i>
          </template>
          Music
        </vs-sidebar-item>
        <vs-sidebar-item id="donate">
          <template #icon>
            <i class='bx bxs-donate-heart' ></i>
          </template>
          Donate
        </vs-sidebar-item>
        <vs-sidebar-item id="drink">
          <template #icon>
            <i class='bx bx-drink'></i>
          </template>
          Drink
        </vs-sidebar-item>
        <vs-sidebar-item id="shopping">
          <template #icon>
            <i class='bx bxs-shopping-bags'></i>
          </template>
          Shopping
        </vs-sidebar-item>
        <vs-sidebar-item id="chat">
          <template #icon>
            <i class='bx bx-chat' ></i>
          </template>
          Chat
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
  props: ['menuOpen'],
  data: () => {
    return {
      active: "home"
    }
  },
  methods: {
        setActiveMenu() {
            this.$emit('set-active-menu');
        }
    }
}
</script>