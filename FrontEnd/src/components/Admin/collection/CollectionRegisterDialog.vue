<template>
    <v-dialog v-model="isDialog" width="70%" persistent>
        <v-stepper v-model="dialogPage">
            <v-stepper-header>
                <v-stepper-step step="1" :complete="dialogPage >= 2" complete-icon="fas fa-check-circle">"ISBN"の入力&確認</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="dialogPage >= 3" complete-icon="fas fa-check-circle"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" :complete="dialogPage >= 4" complete-icon="fas fa-check-circle">登録情報の入力</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4" :complete="dialogPage >= 5" complete-icon="fas fa-check-circle"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="dialogPage >= 6" step="5">完了</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <div class="pt-2 mb-4">
                        <div>
                            <v-text-field
                                label="ISBN"
                                v-model="registerData.isbn"
                                :rules="rules.isbn"
                                outlined>
                            </v-text-field>
                        </div>
                        <div class="d-flex justify-end">
                            <v-btn color="primary" @click="first">
                                次へ
                            </v-btn>
                            <v-btn text @click="close">
                                キャンセル
                            </v-btn>
                        </div>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <div class="mb-12" height="300px">
                        <v-img style="width:50px;margin:auto;" src="../../../assets/book.gif"></v-img>
                        <p style="text-align:center;">
                            Now Loading...
                        </p>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <div class="pt-2 mb-4">
                        <div>
                            <v-text-field
                                label="タイトル"
                                v-model="registerData.title"
                                outlined
                                disabled>
                            </v-text-field>
                            <v-text-field
                                label="ISBN"
                                v-model="registerData.isbn"
                                outlined
                                disabled>
                            </v-text-field>
                            <v-text-field
                                label="NDC"
                                v-model="registerData.ndc"
                                :rules="rules.ndc"
                                outlined>
                            </v-text-field>
                            <v-text-field
                                label="備考"
                                v-model="registerData.note"
                                outlined>
                            </v-text-field>
                        </div>
                        <div class="d-flex justify-end">
                            <v-btn color="primary" @click="second">
                                登録する
                            </v-btn>
                            <v-btn text @click="close">
                                キャンセル
                            </v-btn>
                        </div>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <div class="mb-12" height="300px">
                        <v-img style="width:50px;margin:auto;" src="../../../assets/book.gif"></v-img>
                        <p style="text-align:center;">
                            登録中...
                        </p>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="5">
                    <v-card class="mb-12">
                        <v-card-title>
                            登録完了
                        </v-card-title>
                        <v-container>
                            <v-row>
                                <v-col cols=12 sm=8>
                                    <v-text-field
                                        label="登録日"
                                        v-model="registeredData.registrationDate"
                                        outlined
                                        disabled>
                                    </v-text-field>
                                    <v-text-field
                                        label="UUID"
                                        v-model="registeredData.uuid"
                                        outlined
                                        disabled>
                                    </v-text-field>
                                    <v-text-field
                                    label="ISBN"
                                        v-model="registeredData.isbn"
                                        outlined
                                        disabled>
                                    </v-text-field>
                                    <v-text-field
                                        label="NDC"
                                        v-model="registeredData.ndc"
                                        outlined
                                        disabled>
                                    </v-text-field>
                                    <v-text-field
                                        label="備考"
                                        v-model="registeredData.note"
                                        outlined
                                        disabled>
                                    </v-text-field>
                                </v-col>
                                <v-col cols=12 sm=4>
                                    <v-img :src="this.$store.getters.fileEndpoint + '/' + this.registeredData.uuid + '.png'">
                                    </v-img>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-divider></v-divider>
                        <v-card-actions class="d-flex justify-end">
                            <v-btn color="primary" @click='close'>
                                閉じる
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-dialog>
</template>
<script>

export default {
    props: {
        isDialog: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            dialogPage : 1,
            registerData: {
                isbn:"",
                title:"",
                ndc:"",
                note:""
            },
            registeredData:{},
            rules: {
                isbn:[
                    v => !!v || 'ISBNは必須です',
                    v => /\d{13}/.test(v) && v.length === 13|| 'ISBNは数字13桁です'
                ],
                ndc:[
                    v => !!v || 'NDCは必須です',
                    v => /\d{3}/.test(v) || 'NDC形式に一致しません'
                ]
            }
        }
    },
    methods: {
        close() {
            Object.assign(this.$data, this.$options.data())
            this.$emit('close')
        },
        first() {
            this.dialogPage = 2
            this.axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.registerData.isbn}`)
                .then((res) => {
                    if (res.data.items.length === 0) {
                        this.$emit('error','このISBNは存在しないか登録できない書籍です')
                        this.dialogPage = 1
                    } else {
                        setTimeout(()=>{
                            this.registerData.title = res.data.items[0].volumeInfo.title
                            this.dialogPage = 3
                        },2500)
                    }
                })
                .catch(() => {
                    this.dialogPage = 1
                    this.$router.push('/500')
                })
        },
        second() {
            this.dialogPage = 4
            const options = {
                headers: {
                    token: this.$store.getters.token
                } 
            }
            this.managerApi.post(`/collections`, this.registerData, options)
                .then((postRes) => {
                    this.$emit('reload')
                    setTimeout(()=>{
                        this.registeredData = postRes.data
                        this.dialogPage = 5
                    },2500)
                })
                .catch((e) => {
                    this.dialogPage = 1
                    if (e.response.status === 400) {
                        this.$emit('error',"登録に失敗しました")
                    } else {
                        this.$router.push('/500')
                    }
                })
        }
    },
}
</script>