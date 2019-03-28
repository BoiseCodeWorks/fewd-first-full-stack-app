<template>
    <div class="wifle card">
       <h2>{{wifleData.author.displayName}}</h2>
        <h5>{{wifleData.content}}</h5>
        <form @submit.prevent="addComment">
            <input type="text" required v-model="newComment.content">
            <button>Submit</button>
        </form>
        <div v-for="comment in wifleData.comments">
            <hr>
            <h4>{{comment.content}}</h4>
            <button @click="deleteComment(comment._id)" v-if="comment.author == user._id" class="btn btn-outline-danger">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
   name: "wifle",
   props: ["wifleData"],
   data() {
      return {
          newComment: {
              content: ''
          }
      }
   },
   computed: {
       user() {
           return this.$store.state.user
       }
   },
   methods: {
       addComment() {
           let payload = {
               wifleId: this.wifleData._id,
               comment: {...this.newComment}
           }
           this.$store.dispatch('comment', payload)
           this.newComment = {
               content: ''
           }
       },
       deleteComment(_id) {
           let payload = {
               wifleId: this.wifleData._id,
               comment: {
                   _id
               }
           }
           this.$store.dispatch('comment', payload)
       }
   },
   components: {}
}
</script>