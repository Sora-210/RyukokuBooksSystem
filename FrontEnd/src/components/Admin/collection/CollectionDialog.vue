<template>
    <v-dialog v-model="isDialog" width="70%" @click:outside="close">
        <v-card>
            <v-card-title>
                蔵書情報
            </v-card-title>
            <v-divider></v-divider>
            <div v-if="isLoading">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="タイトル"
                                    v-model="collectionData.title"
                                    disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="著者"
                                    v-model="collectionData.authors"
                                    disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="UUID"
                                    v-model="collectionData.uuid"
                                    disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="ISBN"
                                    v-model="collectionData.isbn"
                                    disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="登録日"
                                    v-model="collectionData.registrationDate"
                                    disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-form ref="form" v-model="isValid">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        label="NDC"
                                        v-model="collectionData.ndc"
                                        :rules="rules.ndc">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        label="備考"
                                        v-model="collectionData.note">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col cols=12 sm=3>
                                <v-img :src="this.$store.getters.fileEndpoint + '/' + this.collectionData.uuid + '.png'">
                                </v-img>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions  class="d-flex justify-end">
                    <v-btn color="warning" @click="close">閉じる</v-btn>
                    <v-btn color="error" @click="deleteCollection">削除</v-btn>
                    <v-btn color="success" @click="update" disabled>更新</v-btn>
                </v-card-actions>
            </div>
            <div v-else>
                <v-img style="width:70px;margin:20px auto;padding:20px" src="../../../assets/book.gif"></v-img>
                <p style="text-align:center;margin:0;padding:10px">
                    Now Loading...
                </p>
            </div>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        isCollectionDialog: {
            type: Boolean,
            default: false
        },
        collectionUuid: {
            type: String,
            default: ''
        }
    },
    data: function() {
        return {
            isLoading: false,
            isDialog: false,
            uuid: "",
            collectionData: {
                title:"",
                authors:"",
                uuid:"",
                isbn:"",
                ndc:"",
                registrationData:"",
                note:""
            },
            isValid: false,
            rules: {
                ndc:[
                    v => !!v || 'NDCは必須です',
                    v => /\d{3}/.test(v) || 'NDC形式に一致しません'
                ]
            }
        }
    },
    methods:{
        async getCollection() {
            this.isLoading = false
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            try {
                const getRes = await this.managerApi.get(`/collections/${this.uuid}`, options)
                this.collectionData = getRes.data.data[0]
            } catch(e) {
                this.$emit('error', e)
            }
            this.isLoading = true
        },
        update() {
            this.$ref.form.validate()
            if (this.isValid) {
                console.log('update')
            }
        },
        async deleteCollection() {
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            if (window.confirm('uuid:' + this.collectionData.uuid + 'を削除してよろしいですか?')) {
                this.managerApi.delete(`/collections/${this.collectionData.uuid}`, options)
                    .then(() => {
                        this.$emit('reload')
                        this.close()
                        this.$emit('success', '削除しました')
                    })
                    .catch((e) => {
                        this.$emit('error', e)
                    })
            }
        },
        close() {
            Object.assign(this.$data.collectionData, this.$options.data().collectionData)
            this.$emit('close')
        }
    },
    watch: {
        isCollectionDialog: function() {
            if (this.isCollectionDialog) {
                this.uuid = this.collectionUuid
                this.isDialog = this.isCollectionDialog
                this.getCollection()
            } else {
                this.uuid = ""
                this.isDialog = false
            }
        }
    }
}
</script>