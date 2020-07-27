<template>
    <div>
        <v-text-field
            label="Name"
            outlined
            v-model="name"
        ></v-text-field>
        <v-text-field
            label="Password"
            outlined
            v-model="password"
        ></v-text-field>
        <v-btn @click="Login">
            Login
        </v-btn>
    </div>
</template>
<script>
export default {
    name: "Login",
    data: function() {
        return {
            name:"",
            password:""
        }
    },
    methods: {
        Login: function() {
            this.axios.post(this.$store.getters.apiEndpoint + '/login',{name:this.name,password:this.password})
                .then((res) => {
                    this.$store.commit('setToken',res.data.token)
                    console.log(res.data.token)
                    this.$emit('Success','ログインしました')
                    this.$router.push('/')
                })
                .catch((e) => {
                    this.$emit('Error',e)
                })
        }
    }
}
</script>