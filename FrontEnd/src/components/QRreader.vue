<template>
    <v-dialog v-model="isDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>QRコードリーダー</v-toolbar-title>
            </v-toolbar>
            <v-row class="d-flex justify-center">
                <v-col cols="12" sm="6">
                    <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
    components: {
        QrcodeStream
    },
    props: {
        isDialog: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        async onDecode (resultUuid) {
            this.$emit('dataUp', resultUuid)
        },
        async onInit (promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.$emit('Error', "SYSTEM-ERROR: カメラへのアクセス権限が必用です")
                } else if (error.name === 'InsecureContextError') {
                    this.$emit('Error', "SYSTEM-ERROR: 暗号化された通信(HTTPS)が必用です")
                } else {
                    this.$emit('Error', `SYSTEM-ERROR: ${error}`)
                }
            }
        },
        close() {
            this.$emit('close')
        }
    }
}
</script>