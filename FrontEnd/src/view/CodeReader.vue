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
                                    :src="this.collectionData.img"
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
    </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    name:"CodeReader",
    data: function() {
        return {
            access :{
                type:"",
                message:"",
                icon:""
            },
            accessStatus:"",
            historyResult:"",
            result:"",
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
        onDecode (result) {
            if (this.historyResult !== result) {
                this.historyResult = result
                this.result = result
                this.access = {type:"",message:"",icon:""}
                this.collectionData = {uuid:"",title:"",authors:"",isbn:"",img:"",publisher:"",url:""}
                this.axios.get('http://localhost/collection/' + result)
                    .then((data) => {
                        console.log(data)
                        if (data.data.status !== "error") {
                            this.access.type = "success"
                            this.access.message = "蔵書が見つかりました!"
                            this.access.icon = "fas fa-check-circle"
                            this.collectionData.isbn = data.data.data[0].isbn
                            this.collectionData.uuid = data.data.data[0].uuid
                            this.axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + this.collectionData.isbn)
                                .then((res) => {
                                    const ResData = res.data.items[0]
                                    this.collectionData.title = ResData.volumeInfo.title
                                    this.collectionData.authors = ResData.volumeInfo.authors
                                    this.collectionData.img = "https://books.google.com/books/content/images/frontcover/" + ResData.id + "?fife=w800-h1200"
                                    this.collectionData.publisher = ResData.volumeInfo.publisher
                                    this.collectionData.url = "/collection/" + this.collectionData.uuid
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        } else {
                            this.access.type = "warning"
                            this.access.icon = "fas fa-exclamation-circle"
                            if (data.data.message === 'Noting Collection') {
                                this.access.message = '読み込んだUUIDが登録された蔵書は見つかりませんでした'
                            } else {
                                this.access.message = data.data.message
                            }
                        }
                    })
                    .catch((err) => {
                        this.access.type = "error"
                        this.access.icon = "fas fa-ban"
                        this.historyResult = ""
                        if (err.response === undefined) {
                            this.access.message = '管理サーバーと通信ができません'
                        } else {
                            this.access.message = err
                        }
                    })
            }
        },
        async onInit (promise) {
            try {
                await promise
            } catch (error) {
                this.access.type = "error"
                this.access.icon = "fas fa-ban"
                if (error.name === 'NotAllowedError') {
                    this.access.message = "SYSTEM-ERROR: カメラへのアクセス権限が必用です"
                } else if (error.name === 'NotFoundError') {
                    this.access.message = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.access.message = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.access.message = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.access.message = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.access.message = "ERROR: Stream API is not supported in this browser"
                }
            }
        }
    }
}
</script>