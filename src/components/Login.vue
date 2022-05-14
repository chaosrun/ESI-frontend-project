<template>
    <div class="grid">
      <vs-row justify="center">
        <vs-col w="6">
            <div class="card border-primary mb-3">
                <div class="card-body">
                    <div class="center content-inputs">
                        <vs-input border v-model="value" placeholder="Name" />

                        <vs-input color="#7d33ff" border type="password" v-model="value2" placeholder="Password">
                            <template #icon>
                            <i class='bx bx-lock-open-alt'></i>
                            </template>
                        </vs-input>
                    </div>
                </div>
            </div>
        </vs-col>
      </vs-row>

    </div>
  </template>
  <script>
    export default {
      data:() => ({
        value: '',
        value2: '',
        value3: '',
      })
    }
  </script>


  