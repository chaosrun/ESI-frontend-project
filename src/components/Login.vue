<template>
    <div class="grid">
      <vs-row justify="center" align="center">
        <vs-col w="6">
<!--           
            <div class="card border-primary mb-3 mt-5">
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
            </div> -->
            <div class="card  mt-5">
              <div class="card-header">
                Sign In
              </div>
              <div class="card-body mt-5">
                <form @submit="handleAuthentication">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                    <div id="usernameHelp" class="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password">
                  </div>
                  <!-- <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Keep me signed in</label>
                  </div> -->
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>

        </vs-col>
      </vs-row>

    </div>
  </template>
  <script>
    import axios from 'axios';
    export default {
      name: "authenticate-user",
      data(){
        return {
          user: {
            id: "",
            email: "",
            role: "",
            name: "",
            library: "",
            token: "",
            authenticated: false
          }
        }
        
      },
      computed: {
        authenticated(){
          return this.user.authenticated;
        }
      },
     
      created() {
        if(this.user.authenticated){
          this.$router.push({path: '/dashboard'})
        }
      },
      methods: {
        handleAuthentication(e){
          e.preventDefault();
          const email = e.target.email.value;
          const password =  e.target.password.value;
          const token = btoa(email+":"+password);
          axios.get(`${process.env.VUE_APP_API_BASE_URL}/auth`, { 
              headers: { 'Authorization': 'Basic '+ token }
            })
          
          .then(response => {
            this.user.id = response.data.id;
            this.user.name = response.data.name;
            this.user.email = response.data.email;
            this.user.role = response.data.role;
            this.user.library = response.data.library;
            this.user.authenticated = true;
            this.user.token = token;
            window.localStorage.setItem("userName",this.user.name);
            window.localStorage.setItem("userEmail", this.user.email);
            window.localStorage.setItem("userRole", this.user.role);
            window.localStorage.setItem("authenticated", this.user.authenticated);
            this.$router.push({name: 'dashboard'})
            
          })
          .catch(error => {
            console.log(error);
          });

        }
      }
    }
  </script>


  