<template>
    <div class="sign-in container-fluid">
       <div class="row justify-content-center">
         <div class="col-10 col-md-6">
           <div class="card">
             <form @submit.prevent="login" class="d-flex flex-column" v-if="existingUser">
               <input v-model="loginCreds.email" type="email" required="required" placeholder="email">
               <input v-model="loginCreds.password" type="password" required="required" placeholder="password">
               <button type="submit" class="btn btn-info">Login</button>
             </form>
             <form @submit.prevent="register" class="d-flex flex-column" v-else>
               <input v-model="regCreds.displayName" type="text" required="required" placeholder="display name">
               <input v-model="regCreds.email" type="email" required="required" placeholder="email">
               <input v-model="regCreds.password" type="password" required="required" placeholder="password">
               <button type="submit" class="btn btn-info">Register</button>
             </form>
              <p class="action" @click="existingUser = !existingUser">{{existingUser ? 'New User? Click here to Register' : 'Existing User? Click here to Login'}}</p>
           </div>
         </div>
       </div>
    </div>
</template>

<script>
export default {
   name: "sign-in",
   props: [],
   data() {
      return {
        existingUser: true,
        loginCreds: {
          email: '',
          password: ''
        },
        regCreds: {
          email: '',
          password: '',
          displayName: ''
        }
      }
   },
   computed: {},
   methods: {
     login() {
       this.$store.dispatch('login', {...this.loginCreds})
       this.loginCreds = {
          email: '',
          password: ''
       }
     },
     register() {
       this.$store.dispatch('register', {...this.regCreds})
       this.regCreds = {
          email: '',
          password: '',
          displayName: ''
        }
     }
   },
   components: {}
}
</script>
