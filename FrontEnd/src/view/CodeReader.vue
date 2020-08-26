<template>
    <div>
        <QRreader :isDialog="isQrDialog" @dataUp="catchQrResult" @close="closeQrDialog" @error="emitError">
        </QRreader>
        <v-overlay :value="isLoading" color="white" opacity=0.7>
            <img src="../assets/book.gif">
        </v-overlay>
    </div>
</template>
<script>
import QRreader from '../components/QRreader.vue'
export default {
    components: {
        QRreader,
    },
    data: function() {
        return {
            isLoading: false,
            isQrDialog: true,
            historyUuid: '',
        }
    },
    methods: {
        async catchQrResult(result) {
            this.isQrDialog = false
            this.isLoading = true
            if (this.historyUuid !== result) {
                this.historyUuid = result
                try {
                    await this.axios.get(`/collections/${result}`)
                    this.$router.push('/collection/' + result)
                } catch(e) {
                    this.isQrDialog = true
                    this.isLoading = false
                    if (e.response.status === 404) {
                        this.$emit('error',"登録されていないUUIDです")
                    } else {
                        this.$router.push('/500')
                    }
                }
            }
        },
        closeQrDialog() {
            this.$router.push('/')
        },
        emitError(message) {
            this.$emit('error', message)
        }
    }
}
</script>