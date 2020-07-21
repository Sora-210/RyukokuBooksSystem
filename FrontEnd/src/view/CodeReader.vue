<template>
    <div>
        <v-row>
            <v-col
                cols="12"
                sm="6"
            >
                <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
            </v-col>
            <v-col
                cols="12"
                sm="6"
            >
                <v-alert
                    v-if="this.access.type !== ''"
                    :type="this.access.type"
                    :icon="this.access.icon"
                >
                    {{ this.access.message }}<br>
                    UUID : {{ this.result }}
                </v-alert>
                <div v-if="this.access.type === 'success'">
                    <v-card>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                            >
                                <v-img
                                    class="pa-1"
                                    :src="this.collectionData.imgUrl"
                                >
                                </v-img>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                            >
                                <v-card-subtitle>
                                    ISBN:{{ this.collectionData.isbn}}
                                </v-card-subtitle>
                                <v-card-title>
                                    {{ this.collectionData.title }}
                                </v-card-title>
                                <v-card-actions>
                                    <router-link :to="this.collectionData.url">
                                        <v-btn
                                            color="orange"
                                            text
                                        >
                                            詳細
                                        </v-btn>
                                    </router-link>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-card>
                </div>
                <p v-if="this.access.type === 'success'">{{ this.collectionData }}</p>
            </v-col>
        </v-row>
        <v-overlay :value="isLoading">
            <img src="https://icons8.com/vue-static/landings/animated-icons/icons/qr-code/qr-code.gif" style="width:100px;height:100px;">
        </v-overlay>
    </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    name:"CodeReader",
    data: function() {
        return {
            isLoading: false,
            historyUuid:"",
            resultUuid:"",

            access :{
                type:"",
                message:"",
                icon:""
            },
            accessStatus:"",
            collectionData:{
                uuid:"",
                title:"",
                authors:"",
                isbn:"",
                img:"",
                publisher:"",
                url:""
            }
        }
    },
    components: {
        QrcodeStream,
    },
    methods: {
        reset() {
            this.access = {type:"",message:"",icon:""}
            this.collectionData = {uuid:"",title:"",authors:"",isbn:"",img:"",publisher:"",url:""}
        },
        async onDecode (resultUuid) {
            this.isLoading = true
            if (this.historyUuid !== resultUuid) {
                this.historyUuid = resultUuid
                this.resultUuid = resultUuid
                try {
                    const apiRes = await this.axios.get('http://localhost/collections/' + resultUuid)
                    console.log(apiRes)
                    this.collectionData = apiRes.data.CollectionData
                    this.collectionData = apiRes.data.BookData
                    console.log(this.collectionData)
                    this.access.type = "success"
                } catch(e) {
                    console.log(e)
                }
                
            }
            setTimeout(()=> {
                this.isLoading = false
            }, 1500)
        },
        async onInit (promise) {
            try {
                await promise
            } catch (error) {
                this.access.type = "error"
                this.access.icon = "fas fa-ban"
                console.log("Error:")
                console.log(error)
                if (error.name === 'NotAllowedError') {
                    this.access.message = "SYSTEM-ERROR: カメラへのアクセス権限が必用です"
                } else if (error.name === 'InsecureContextError') {
                    this.access.message = "SYSTEM-ERROR: 通信が暗号化されていません"
                } else {
                    this.access.message = "ERROR: " + error.name
                }
            }
        }
    }
}
</script>