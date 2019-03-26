<template>
    <div class="wifles container-fluid">
       <div class="row">
           <div class="col">
               <h1 class="text-center">Wifles</h1>
           </div>
       </div>
       <div class="row justify-content-center">
           <div class="col-10">
               <form @submit.prevent="createWifle" class="d-flex flex-column">
                    <input placeholder="author" type="text" v-model="wifle.author" required="required">
                    <textarea placeholder="What I feel like expressing" name="" id="" cols="30" rows="10" v-model="wifle.content" required="required"></textarea>
                    <button class="btn btn-info" type="submit">Submit</button>
                </form>
           </div>
       </div>
       <div class="row">
           <div class="col-12 text-center" v-for="wifle in wifles">
               <h2>{{wifle.author}}</h2>
               <h5>{{wifle.content}}</h5>
           </div>
       </div>
    </div>
</template>

<script>
export default {
   name: "wifles",
   props: [],
   data() {
      return {
          wifle: {
              author: '',
              content: ''
          }
      }
   },
   computed: {
       wifles() {
           return this.$store.state.wifles
       }
   },
   methods: {
       createWifle() {
           this.$store.dispatch('createWifle', {...this.wifle})
           this.wifle = {
               author: '',
               content: ''
           }
       }
   },
   components: {}
}
</script>