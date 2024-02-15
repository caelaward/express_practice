<template>
    <div class="login">

    <h1>This is the table page</h1>

  
      
    <table class="table">
      <tr class="thead">
        <th>id</th>
        <th>name</th>
        <th>age</th>
      </tr>
      <tbody v-for="item in $store.state.friends" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.age}}</td>
         <button @click="deleteFriend(item.name)">x</button>
         <button @click="editFriend(item.id)">edit</button>
      </tbody>
    </table>
    <br><br>
  
      <input type="text" placeholder="full name" v-model="name" required >
      <input type="number" placeholder="age" v-model="age" required >
      <button @click='addFriend'>Add</button>
    
  
  </div>
</template>


<script>
export default {
  data(){
            return{
                name:null,
                age:null
            }
        },
        methods:{
            deleteFriend(name){
              this.$store.dispatch('deleteFriend',name)
            },
            editFriend(id){
              let edit={
                id:id,
                // name and age from data function .. whenever inside script tag in view and wanna refer to data function must use this. 
                name:this.name,
                age:this.age

              }
              // passing edit through to action
               this.$store.dispatch('editFriend',edit)
            }
        },
  computed :{
    getFriends(){
      this.$store.dispatch('getFriends')
    },
    addFriend(){
      this.$store.dispatch('addFriend',this.$data)
    },
  
},
  mounted(){
    this.getFriends
    
  }
}

</script>

<style >
.table{
  border: 2px solid;
}
.thead{
  background-color: aqua;
}



</style>