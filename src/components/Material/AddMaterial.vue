<template>
  <div>
      <!-- <vs-row justify="center">
        <vs-col w="6">

        </vs-col>
      </vs-row> -->

    <form>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingTitleInput" placeholder="Rise of the yellow sun" v-model="title">
            <label for="floatingTitleInput">Title</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingAuthorInput" placeholder="john, mark, sam" v-model="author">
            <label for="floatingAuthorInput">Authors (seperate with comas)</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingCallNumberInput" placeholder="IC-9078234" v-model="callNumber">
            <label for="floatingCallNumberInput">Call number (must be unique)</label>
        </div>
        <div class="row">
            <div class="col-md-3">
                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="floatingPublishedAtInput" v-model="publishedAt">
                    <label for="floatingPublishedAtInput">Published at</label>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingTypeInput" placeholder="" v-model="type">
                    <label for="floatingTypeInput">Type</label>
                </div>
            </div>
        </div>

        <button class="vs-button vs-button--null vs-button--size-large vs-button--primary vs-button--flat" @click.prevent="create">
            <div class="vs-button__content"> Create material </div>
        </button>
    </form>
  </div>  
</template>

<script>
export default {
  name: 'AddMaterial',
  data: function() {
    return {
        title: '',
        author: '',
        callNumber: '',
        publishedAt: '',
        type: ''
    }
  },
  components: {
  },
  methods: {
      create () {
          alert("here")
      }
  }
}
</script>

<style></style>