<template>
    <div class="">
         <vs-row>
            <vs-col offset="10" w="2" class="mb-2">
                <vs-button
                    @click="$router.push('/catalog')"
                    size="xl"
                >
                    <i class="bx bx-add"></i> View Catalog
                </vs-button>
            </vs-col>
        </vs-row>
        <div class="col-sm-12">
            <div class="card p-5 rounded">
                <div class="card-body">
                    <h5 class="card-title">Add new material</h5>
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
                            <div class="col-md-2">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingHomeLibraryInput" v-model="homeLibrary" placeholder="A">
                                    <label for="floatingHomeLibraryInput">Home library</label>
                                </div>
                            </div>
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

                        <button class="vs-button vs-button--null vs-button--size-large vs-button--primary vs-button--flat" @click.prevent="createMaterial">
                            <div class="vs-button__content"> Create material </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddMaterial',
  data: function() {
    return {
        title: '',
        author: '',
        callNumber: '',
        publishedAt: '',
        type: '',
        homeLibrary: '',
    }
  },
  components: {
  },
  methods: {
      createMaterial (e) {
          e.preventDefault();
          const token = window.localStorage.getItem('user-token');
          axios.post(`${process.env.VUE_APP_API_BASE_URL}/material`, {
              title: this.title,
              author: this.author,
              callNumber: this.callNumber,
              publishedAt: this.publishedAt,
              type: this.type,
              homeLibrary: this.homeLibrary,
          }, { 
              headers: { 'Authorization': 'Basic '+ token }
            })
          .then(response => {
              console.log(response)
              this.$vs.notification({
                    color: 'success',
                    position: 'top-right',
                    title: 'Success',
                    text: `"${this.title}" Material created successfully!`
                })
                this.title = '';
                this.author = '';
                this.callNumber = '';
                this.publishedAt = '';
                this.type = '';
                this.homeLibrary = '';
          })
          .catch(error => {
              const status = error.response.status;
              const data = error.response.data;

              if(status === 400) {
                  this.$vs.notification({
                    color: 'danger',
                    position: 'top-right',
                    title: 'Error',
                    text: 'Please fill all fields correctly'
                })
              } else {
                this.$vs.notification({
                    color: 'danger',
                    position: 'top-right',
                    title: 'Error',
                    text: data.error
                })
              }

              console.log(status, data);
          });
      }
  },
}
</script>

<style></style>