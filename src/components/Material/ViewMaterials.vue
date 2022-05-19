<template>
  <div>
    <vs-row>
        <vs-col offset="10" w="2" class="mb-2">
            <vs-button
                v-if="currentUserRole === LIBRARIAN_ROLE"
                @click="$router.push('/material/add')"
                size="xl"
            >
                <i class="bx bx-add"></i> Add New Material
            </vs-button>
        </vs-col>
    </vs-row>
    <vs-table class="bg-white">
        <template class="bg-white" #header>
            <vs-input v-model="search" border placeholder="Search" />
        </template>
        <template #thead class="bg-white">
            <vs-tr>
                <vs-th sort @click="materials = $vs.sortData($event ,materials, 'title')">
                    Title
                </vs-th>
                <vs-th sort @click="materials = $vs.sortData($event ,materials, 'homeLibrary')">
                    Home Library
                </vs-th>
                <vs-th sort @click="materials = $vs.sortData($event ,materials, 'callNumber')">
                    Call number
                </vs-th>
                <vs-th sort @click="materials = $vs.sortData($event ,materials, 'type')">
                    Type
                </vs-th>
                <vs-th sort @click="materials = $vs.sortData($event ,materials, 'publishedAt')">
                    Published at
                </vs-th>

                <vs-th>
                    Actions
                </vs-th>
            </vs-tr>
        </template>
        <template #tbody>
            <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage($vs.getSearch(materials, search), page, max)"
            :data="tr"
            >
                <vs-td>
                    {{ tr.title }}
                </vs-td>
                <vs-td>
                    {{ tr.homeLibrary }}
                </vs-td>
                <vs-td>
                    {{ tr.callNumber }}
                </vs-td>
                <vs-td>
                    {{ tr.type }}
                </vs-td>
                <vs-td>
                    {{ tr.publishedAt }}
                </vs-td>
                <vs-td class="row">
                    <vs-button
                        icon
                        v-if="currentUserRole === LIBRARIAN_ROLE"
                        color="primary"
                        flat
                        @click="openDialog(tr)"
                        class="col-md-2"
                    >
                        <i class='bx bxs-edit' ></i>
                    </vs-button>
                    <vs-button
                        icon
                        v-if="currentUserRole === LIBRARIAN_ROLE"
                        color="danger"
                        flat
                        @click="deleteMaterial(tr)"
                        class="col-md-2"
                    >
                        <i class='bx bxs-trash' ></i>
                    </vs-button>
                    <vs-button
                        v-if="currentUserRole === BORROWER_ROLE"
                        color="primary"
                        flat
                        @click="alert('loan request button event')"
                        class="col-md-10"
                    >
                        Request loan 
                    </vs-button>
                    &nbsp;
                </vs-td>


                <template #expand>
                    <div class="con-content">
                        <div class="text-center">
                            <p>
                                <strong> Author(s): </strong>
                            </p>
                            <p>{{tr.author}}</p>
                        </div>
                    </div>
                    </template>
            </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(materials, search), max)" />
        </template>
    </vs-table>

    <vs-dialog v-model="isDialogOpen">
        <template #header>
          <h4 class="not-margin">
            Update Material
          </h4>
        </template>

        <form>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingTitleInput" placeholder="Rise of the yellow sun" v-model="materialToBeUpdated.title">
                <label for="floatingTitleInput">Title</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingAuthorInput" placeholder="john, mark, sam" v-model="materialToBeUpdated.author">
                <label for="floatingAuthorInput">Authors (seperate with comas)</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingCallNumberInput" placeholder="IC-9078234" v-model="materialToBeUpdated.callNumber">
                <label for="floatingCallNumberInput">Call number (must be unique)</label>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingHomeLibraryInput" v-model="materialToBeUpdated.homeLibrary" placeholder="A">
                        <label for="floatingHomeLibraryInput">Home library</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="floatingPublishedAtInput" v-model="materialToBeUpdated.publishedAt">
                        <label for="floatingPublishedAtInput">Published at</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingTypeInput" placeholder="" v-model="materialToBeUpdated.type">
                        <label for="floatingTypeInput">Type</label>
                    </div>
                </div>
            </div>

            <button class="vs-button vs-button--null vs-button--size-large vs-button--primary vs-button--flat" @click.prevent="updateMaterial">
                <div class="vs-button__content"> Update material </div>
            </button>
        </form> 

    </vs-dialog>
  </div>  
</template>

<script>
import axios from 'axios';
export default {
  name: 'ViewMaterials',
  data: function() {
    return {
        search: '',
        page: 1,
        max: 15,
        materials: [],
        isDialogOpen: false,
        materialToBeUpdated: {},
        currentUserRole: '',
        BORROWER_ROLE: process.env.VUE_APP_BORROWER_ROLE,
        LIBRARIAN_ROLE: process.env.VUE_APP_LIBRARIAN_ROLE
    }
  },
  components: {
  },
  methods: {
      fetchMaterials () {
          const loading = this.$vs.loading();
          const token = window.localStorage.getItem('user-token');
          axios.get(`${process.env.VUE_APP_API_BASE_URL}/catalogs`, { 
              headers: { 'Authorization': 'Basic '+ token }
            })
          .then(response => {
              this.materials = response.data;
              loading.close();
          })
          .catch(error => {
              loading.close();
              const status = error.response.status;
              const data = error.response.data;
                this.$vs.notification({
                    color: 'danger',
                    position: 'top-right',
                    title: 'Error',
                    text: data.error
                })
              console.log(status, data);
          });
      },

      closeDialog () {
          this.isDialogOpen = false;
          this.materialToBeUpdated = '';
      }, 
      
      openDialog (material) {
          this.isDialogOpen = true;
          this.materialToBeUpdated = material;
      },
      deleteMaterial (material) {
          const loading = this.$vs.loading();
          const token = window.localStorage.getItem('user-token');
          axios.delete(`${process.env.VUE_APP_API_BASE_URL}/material/${material.id}`, { 
              headers: { 'Authorization': 'Basic '+ token }
            })
          .then(response => {
              this.fetchMaterials();
              this.$vs.notification({
                    color: 'success',
                    position: 'top-right',
                    title: 'Success',
                    text: `"${this.material.title}" Material deleted successfully!`
                    })
              loading.close();
              console.log(response)
          })
          .catch(error => {
              loading.close();
              const status = error.response.status;
                this.fetchMaterials();
              const data = error.response.data;
                this.$vs.notification({
                    color: 'danger',
                    position: 'top-right',
                    title: 'Error',
                    text: data.error
                })
              console.log(status, data);
          });
      },
      updateMaterial (e) {
          e.preventDefault();
          const token = window.localStorage.getItem('user-token');
          axios.put(`${process.env.VUE_APP_API_BASE_URL}/material/${this.materialToBeUpdated.id}`, this.materialToBeUpdated, { 
              headers: { 'Authorization': 'Basic '+ token }
            })
          .then(response => {
              console.log(response)
                  this.fetchMaterials();
              this.$vs.notification({
                    color: 'success',
                    position: 'top-right',
                    title: 'Success',
                    text: `"${this.materialToBeUpdated.title}" Material updated successfully!`
                })
                this.closeDialog();
          })
          .catch(error => {
              const status = error.response.status;
              const data = error.response.data;
                  this.fetchMaterials();

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

  mounted() {
      this.fetchMaterials();
      const user = window.localStorage.getItem('user');
      const userInformation = JSON.parse(user);
      this.currentUserRole = userInformation.role;
  }
}
</script>

<style></style>