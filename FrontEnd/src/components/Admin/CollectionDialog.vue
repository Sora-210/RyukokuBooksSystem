<template>
    <v-dialog v-model="isDialog" width="70%" @click:outside="Close">
        <v-card>
            <v-card-title>
                蔵書情報
            </v-card-title>
            <v-divider></v-divider>
            <div v-if="getStatus">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="タイトル"
                                    v-model="BookData.title"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="著者"
                                    v-model="BookData.authors"
                                    disabled
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="UUID"
                                    v-model="CollectionData.uuid"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="ISBN"
                                    v-model="CollectionData.isbn"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="NCD"
                                    v-model="CollectionData.ncd"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="登録日"
                                    v-model="CollectionData.registrationData"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="備考"
                                    v-model="CollectionData.note"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col cols=12 sm=3>
                                <v-img
                                    :src="this.$store.getters.fileEndpoint + '/' + this.CollectionData.uuid + '.png'"
                                >
                                </v-img>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions  class="d-flex justify-end">
                        <v-btn color="warning" @click="Close">閉じる</v-btn>
                        <v-btn color="error" @click="Delete">削除</v-btn>
                        <v-btn color="success" @click="Updata">更新</v-btn>
                </v-card-actions>
            </div>
            <div v-else>
                <v-img style="width:70px;margin:20px auto;padding:20px" src="../../assets/book.gif"></v-img>
                <p style="text-align:center;margin:0;padding:10px">Now Loading</p>
            </div>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name:"CollectionDialog",
    props:[
        'isCollectionDialog',
        'collectionUuid'
    ],
    data: function() {
        return {
            getStatus: false,
            isDialog: false,
            uuid: "",
            CollectionData: {
                uuid:"",
                isbn:"",
                ndc:"",
                registrationData:"",
                note:""
            },
            BookData: {
                title:"",
                authors:""
            }
        }
    },
    methods:{
        requestGetCollectoin: async function() {
            this.getStatus = false
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            await this.axios.get(this.$store.getters.apiEndpoint + '/collections/' + this.uuid, options)
                .then((res) => {
                    this.CollectionData = res.data.CollectionData
                })
                .catch((e) => {
                    this.$emit('Error',e)
                })
            await this.axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + this.CollectionData.isbn)
                .then((res) => {
                    this.BookData.title = res.data.items[0].volumeInfo.title
                    this.BookData.authors = res.data.items[0].volumeInfo.authors
                    console.log(this.BookData)
                })
                .catch((e) => {
                    this.$emit('Error',e)
                })
            this.getStatus = true
        },
        Updata: function() {
            console.log("")
        },
        Delete: function() {
            console.log("")
        },
        Close: function() {
            this.$emit('close')
        }
    },
    watch: {
        isCollectionDialog: function() {
            if (this.isCollectionDialog) {
                this.uuid = this.collectionUuid
                this.isDialog = this.isCollectionDialog
                this.requestGetCollectoin()
            } else {
                this.uuid = ""
                this.isDialog = false
            }
        }
    }
}
</script>