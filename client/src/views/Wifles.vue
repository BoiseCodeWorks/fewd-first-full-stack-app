<template>
    <div class="wifles container-fluid">
       <div class="row">
           <div class="col">
               <h1 class="text-center">Wifles</h1>
           </div>
       </div>
       <div class="row justify-content-center">
           <div class="col-10">
               <form v-if="showForm" @submit.prevent="createWifle" class="d-flex flex-column">
                    <textarea placeholder="What I feel like expressing" name="" id="" cols="30" rows="10" v-model="wifle.content" required="required"></textarea>
                    <button class="btn btn-info" type="submit">Submit</button>
                </form>
                <p class="action" @click="showForm = !showForm">{{showForm ? 'Collapse Form' : 'Show Form'}}</p>
           </div>
       </div>
       <div class="row justify-content-center">
           <wifle class="col-10 text-center" :wifleData="wifle" v-for="wifle in wifles"></wifle>
       </div>
    </div>
</template>

<script>
import Wifle from '@/components/Wifle.vue'
export default {
   name: "wifles",
   props: [],
   data() {
      return {
          showForm: true,
          wifle: {
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
               content: ''
           }
       }
   },
   components: {
       Wifle
   }
}
</script>