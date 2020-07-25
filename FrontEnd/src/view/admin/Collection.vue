<template>
    <div>
        <v-card>
            <v-card-title>
                蔵書一覧
            </v-card-title>
            <v-btn
                class="ml-8"
                color="success"
                @click="registerDialog = !registerDialog"
            >
                蔵書登録
            </v-btn>
            <Table
                :columnNames=collectionColumnNames
                :listItems=collectionItems
                @Edit="edit"
            >
            </Table>
        </v-card>
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
                        <v-img style="width:50px;margin:auto;" src="../../assets/book.gif"></v-img>
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
                        <v-img style="width:50px;margin:auto;" src="../../assets/book.gif"></v-img>
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
import Table from '../../components/Table.vue'
export default {
    components: {
        Table
    },
    data: function() {
        return {
            collectionColumnNames:[
                {
                    title:"UUID",
                    variableName:"uuid"
                },
                {
                    title:"ISBN",
                    variableName:"isbn"
                },
                {
                    title:"NCD",
                    variableName:"ncd"
                },
                {
                    title:"登録日",
                    variableName:"registrationData"
                },
                {
                    title:"備考",
                    variableName:"note"
                },
                {
                    title:"編集",
                    variableName:"edit"
                }
            ],
            collectionItems:[],
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
        this.getCollections()
    },
    methods: {
        getCollections() {
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.axios.get(this.$store.getters.apiEndpoint + '/collections', options)
                .then((res) => {
                    res.data.forEach(el => {
                        this.collectionItems.push({
                            uuid: el.uuid,
                            isbn: el.isbn,
                            ncd: el.ncd,
                            registrationData: el.registrationData,
                            note: el.note,
                            edit: {
                                text:"編集",
                                emitName:"Edit",
                                emitVariable:el.uuid
                            }
                        })
                    });
                    console.log(this.collectionItems)
                })
                .catch((e) => {
                    alert("Err:"+e)
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
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.axios.post(this.$store.getters.apiEndpoint + '/collections', this.registerData, options)
                .then((res) => {
                    if (res.data.status === "error") {
                        this.registerDialogMessage = "登録に失敗しました"
                        this.registerDialogTurn = 1
                    } else {
                        this.reload()
                        setTimeout(()=>{
                            console.log(res)
                            console.log(res.data)
                            this.registeredData = res.data
                            this.registerDialogTurn = 5
                        },2500)
                    }
                })
                .catch((err) => {
                    alert("Error:"+err)
                    this.registerDialogMessage = "想定外のエラーが発生しました"
                    this.registerDialogTurn = 1
                })
        },
        edit(isbn) {
            this.$router.push('/collection/'+isbn)
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
th,
td {
    padding: 7px 20px 7px 20px;
}
.tableTitle {
    background-color:#e9e9e9;
    border-top: solid 1px#000000;
    border-bottom: solid 1px#000000;
}
.tableItem {
    text-align: left;
    border-bottom: solid 0.5px #e6e6e6;
}
.tableItem:hover {
    background-color:#f1f1f1;
}
</style>