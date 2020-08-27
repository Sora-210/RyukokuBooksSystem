<template>
    <div>
        <v-text-field label="Name" v-model="name" outlined></v-text-field>
        <v-text-field label="Password" v-model="password" outlined></v-text-field>
        <v-btn @click="login">
            Login
        </v-btn>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            name:"",
            password:""
        }
    },
    methods: {
        login() {
            this.managerApi.post('/login', {name:this.name,password:this.password})
                .then((postRes) => {
                    this.$store.commit('setToken', postRes.data.token)
                    this.$emit('success', 'ログインしました')
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