<template>
  <div>
     <h1>Login Page</h1>
    <input type="email" placeholder="username" name="username" required v-model="username"><br><br>
    <input type="password" placeholder="password" name="password" required v-model="password">
    <br>
    <br>
    <button @click="submitData">Register</button>
    <button >Login</button>
  </div>
</template>

<script>
export default {
     data(){
        // as typing data gets saved here 
            return{
                username:'',
                password:''
            }
        },
        methods:{
            submitData(){
                // console.log(this.email)
                // console.log(this.password)
                console.log(this.$data);
                this.$store.dispatch('addUser',this.$data)
            }
        }
}
</script>

<style>

</style>