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
            this.axios.post('/login',{name:this.name,password:this.password})
                .then((res) => {
                    this.$store.commit('setToken',res.data.token)
                    this.$emit('success','ログインしました')
                    this.$router.push('/')
                })
                .catch((e) => {
                    if (e.response.status === 403) {
                        this.$emit('error', 'NameもしくはPasswordが間違っています')
                    } else {
                        this.$router.push('/500')
                    }
                })
        }
    }
}
</script>