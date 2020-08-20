<template>
    <div>
        <QRreader :isQrDialog="isQrDialog" @dataUp="QrResult" @close="Close" @Error="Error">
        </QRreader>
        <v-overlay :value="isLoading" color="white" opacity=0.7>
            <img src="../assets/book.gif">
        </v-overlay>
    </div>
</template>
<script>
import QRreader from '../components/QRreader.vue'

export default {
    name:"CodeReader",
    components: {
        QRreader,
    },
    data: function() {
        return {
            isLoading: false,
            historyUuid:"",
            isQrDialog: true
        }
    },
    methods: {
        QrResult: async function(result) {
            this.isQrDialog = false
            this.isLoading = true
            if (this.historyUuid !== result) {
                this.historyUuid = result
                try {
                    await this.axios.get(`${this.$store.getters.apiEndpoint}/collections/${result}`)
                    this.$router.push('/collection/' + result)
                } catch(e) {
                    if (e.response.status === 404) {
                        this.$emit('Error',"登録されていないUUIDです")
                    } else {
                        console.error(e)
                        this.$router.push('/500')
                    }
                    this.isQrDialog = true
                    this.isLoading = false
                }
                
            }
        },
        Close: function() {
            this.$router.push('/')
        },
        Error: function(message) {
            this.$emit('Error', message)
        }
    }
}
</script>