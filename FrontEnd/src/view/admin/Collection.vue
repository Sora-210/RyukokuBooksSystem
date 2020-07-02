<template>
    <div>
        <v-alert
            border="left"
            colored-border
            color="deep-purple accent-4"
            elevation="2"
        >
            蔵書の登録出来ません
        </v-alert>
        <v-btn
            color="success"
            @click="registerDialog = !registerDialog"
        >
            蔵書登録
        </v-btn>
        <div class="sp-row-scroll mt-7 mx-1">
            <table>
                <tr class="colName">
                    <th>
                        UUID
                    </th>
                    <th>
                        ISBN
                    </th>
                    <th>
                        タイトル
                    </th>
                    <th>
                        NCD
                    </th>
                    <th>
                        登録日
                    </th>
                    <th>
                        備考
                    </th>
                </tr>
                <tr class="row-item" v-for="item in this.collectionsList" :key="item.index">
                    <td>
                        {{ item.uuid }}
                    </td>
                    <td>
                        {{ item.isbn }}
                    </td>
                    <td>
                        タイトル
                    </td>
                    <td>
                        {{ item.ncd }}
                    </td>
                    <td>
                        {{ item.registrationData }}
                    </td>
                    <td>
                        {{ item.note }}
                    </td>
                </tr>
            </table>
        </div>
        <v-dialog v-model="registerDialog" width="70%" persistent>
            <v-stepper v-model="registerDialogTurn">
                <v-stepper-header>
                    <v-stepper-step step="1" :complete="registerDialogTurn >= 2" complete-icon="fas fa-check-circle">"ISBN"の入力</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2" :complete="registerDialogTurn >= 3" complete-icon="fas fa-check-circle"></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3" :complete="registerDialogTurn >= 4" complete-icon="fas fa-check-circle">登録情報の入力</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="4" :complete="registerDialogTurn >= 5" complete-icon="fas fa-check-circle"></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="registerDialogTurn >= 6" step="5">完了</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                <v-stepper-content step="1">
                    <div
                        class="pt-2 mb-4"
                    >
                        <v-alert
                            v-if="this.registerDialogMessage !== ''"
                            icon="fas fa-exclamation-triangle"
                            dense
                            outlined
                            type="error"
                        >
                            {{ registerDialogMessage }}
                        </v-alert>
                        <v-text-field
                            outlined
                            label="ISBN"
                            v-model="registerData.isbn"
                            :rules="rules.isbn"
                        >
                        </v-text-field>
                    </div>
                    <v-btn
                        color="primary"
                        @click="registerFirst"
                    >
                    次へ
                    </v-btn>
                    <v-btn text @click="reset">
                        キャンセル
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <div
                        class="mb-12"
                        height="200px"
                    >
                        <v-img style="width:50px;margin:auto;" src="https://icons8.com/vue-static/landings/animated-icons/icons/book/book.gif"></v-img>
                        <p style="text-align:center;">Lodding Now...</p>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <div
                        class="pt-2 mb-4"
                    >
                        <v-text-field
                            outlined
                            disabled
                            label="タイトル"
                            v-model="registerData.title"
                        >
                        </v-text-field>
                        <v-text-field
                            outlined
                            disabled
                            label="ISBN"
                            v-model="registerData.isbn"
                        >
                        </v-text-field>
                        <v-text-field
                            outlined
                            label="NCD"
                            v-model="registerData.ncd"
                            :rules="rules.ncd"
                        >
                        </v-text-field>
                        <v-text-field
                            outlined
                            label="備考"
                            v-model="registerData.note"
                        >
                        </v-text-field>
                    </div>
                    <v-btn
                        color="primary"
                        @click="registerSecond"
                    >
                        登録する
                    </v-btn>
                    <v-btn text @click="reset">
                        キャンセル
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <div
                        class="mb-12"
                        height="200px"
                    >
                        <v-img style="width:50px;margin:auto;" src="https://icons8.com/vue-static/landings/animated-icons/icons/book/book.gif"></v-img>
                        <p style="text-align:center;">登録中...</p>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="5">
                    <v-card
                        class="mb-12"
                        height="200px"
                    >
                        <v-card-title>
                            登録完了
                        </v-card-title>
                        <p>
                            {{ registeredData }}
                        </p>
                    </v-card>
                    <v-btn
                        color="primary"
                        @click="reset"
                    >
                    閉じる
                    </v-btn>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            collectionsList:[],
            registerDialog:false,
            registerDialogMessage:"",
            registerDialogTurn : 1,
            registerData: {
                isbn:"",
                title:"",
                ncd:"",
                note:""
            },
            registeredData:{},
            rules: {
                isbn:[
                    v => !!v || 'ISBNは必須です',
                    v => /\d{13}/.test(v) && v.length === 13|| 'ISBNは数字13桁です'
                ],
                ncd:[
                    v => !!v || 'NCDは必須です',
                    v => /\d{3}/.test(v) || 'NCD形式に一致しません'
                ]
            }
        }
    },
    mounted: function() {
        this.axios.get('http://localhost/collections')
            .then((res) => {
                console.log(res)
                this.collectionsList = res.data.data
            })
            .catch((err) => {
                console.log(err)
            })
    },
    methods: {
        reload() {
            this.axios.get('http://localhost/collections')
                .then((res) => {
                    console.log(res)
                    this.collectionsList = res.data.data
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        reset() {
            this.registerDialog = false
            this.registerDialogTurn = 1
            this.registerDialogMessage = ""
            this.registerData = {isbn:"",title:"",ncd:"",note:""}
        },
        registerFirst() {
            this.registerDialogTurn = 2
            this.axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + this.registerData.isbn)
                .then((res) => {
                    if (res.data.items.length === 0) {
                        this.registerDialogMessage = "このISBNは存在しないか登録できない書籍です"
                        this.registerDialogTurn = 1
                    } else {
                        setTimeout(()=>{
                            this.registerData.title = res.data.items[0].volumeInfo.title
                            this.registerDialogTurn = 3
                        },2500)
                    }
                })
                .catch(() => {
                    this.registerDialogMessage = "想定外のエラーが発生しました"
                    this.registerDialogTurn = 1
                })
        },
        registerSecond() {
            this.registerDialogTurn = 4
            this.axios.post('http://localhost/collections', this.registerData)
                .then((res) => {
                    if (res.data.data.status === "error") {
                        this.registerDialogMessage = "登録に失敗しました"
                        this.registerDialogTurn = 1
                    } else {
                        this.reload()
                        setTimeout(()=>{
                            console.log(res)
                            console.log(res.data.data)
                            this.registeredData = res.data.data
                            this.registerDialogTurn = 5
                        },2500)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.registerDialogMessage = "想定外のエラーが発生しました"
                    this.registerDialogTurn = 1
                })
        }
    }
}
</script>

<style scoped>
.sp-row-scroll {
    display: block;
    overflow-x: scroll;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}
table {
    border-collapse: collapse;
    width:100%;
}
th {
    padding: 10px 20px 10px 20px;
}
td {
    padding :10px 20px 10px 20px;
}
.colName {
    background-color:#d6d6d6;
    border-top: solid 1px#000000;
    border-bottom: solid 1px#000000;
}
.row-item {
    text-align: center;
}
</style>