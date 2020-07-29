<template>
    <div>
        <v-card>
            <v-card-title>
                蔵書一覧
            </v-card-title>
            <v-btn
                class="ml-8 mb-5"
                color="success"
                @click="registerDialog = !registerDialog"
            >
                蔵書登録
            </v-btn>
            <v-divider></v-divider>
            <v-btn text color="purple darken-3" class="ml-1 mb-3" @click="isSelectSortDialog = !isSelectSortDialog">
                    絞り込み | 並べ替え
            </v-btn>
            <Table
                :columnNames=collectionColumnNames
                :listItems=collectionItems
                @Edit="edit"
            >
            </Table>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="text-right">
                    <v-pagination
                    v-model="searchConditions.page"
                    next-icon="fas fa-caret-right"
                    prev-icon="fas fa-caret-left"
                    :length="collectionPages"
                    ></v-pagination>
                </div>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="isSelectSortDialog" width="70%">
            <v-card>
                <v-card-title>
                    絞り込み | 並び替え
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="UUID"
                                    append-icon="fas fa-qrcode"
                                    @click:append="isQrDialog = true"
                                    v-model="searchConditions.uuid"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="備考"
                                    v-model="searchConditions.note"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="NCD"
                                    v-model="searchConditions.ncd"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    append-icon="fas fa-caret-down"
                                    :items="[{text:'UUID',value:'uuid'},{text:'登録日',value:'registrationData'}]"
                                    v-model="searchConditions.sortRow"
                                    label="並び替え"
                                ></v-select>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    append-icon="fas fa-caret-down"
                                    :items="[{text:'降順',value:0},{text:'昇順',value:1}]"
                                    v-model="searchConditions.sortDirection"
                                    label="順番"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                        <v-btn color="warning" @click="searchReset">リセット</v-btn>
                        <v-btn color="success" @click="search">検索</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                        height="300px"
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
                        height="300px"
                    >
                        <v-img style="width:50px;margin:auto;" src="../../assets/book.gif"></v-img>
                        <p style="text-align:center;">登録中...</p>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="5">
                    <v-card
                        class="mb-12"
                    >
                        <v-card-title>
                            登録完了
                        </v-card-title>
                        <v-container>
                            <v-row>
                                <v-col cols=12 sm=8>
                                    <v-text-field
                                        outlined
                                        disabled
                                        label="登録日"
                                        v-model="registeredData.collection.registrationData"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        outlined
                                        disabled
                                        label="UUID"
                                        v-model="registeredData.collection.uuid"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        outlined
                                        disabled
                                        label="ISBN"
                                        v-model="registeredData.collection.isbn"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        outlined
                                        disabled
                                        label="NDC"
                                        v-model="registeredData.collection.ncd"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        outlined
                                        disabled
                                        label="備考"
                                        v-model="registeredData.collection.note"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols=12 sm=4>
                                    <v-img
                                        :src="this.$store.getters.fileEndpoint + '/' + this.registeredData.collection.uuid + '.png'"
                                    >
                                    </v-img>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                    <v-btn
                        color="primary"
                        @click="this.registerDialog = false"
                    >
                    閉じる
                    </v-btn>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
        <collection-dialog
            :isCollectionDialog="isCollectionDialog"
            :collectionUuid="collectionDialogUuid"
            @close="isCollectionDialog = false"
            @Error = "Error">
        </collection-dialog>
        <QRreader
            :isQrDialog="isQrDialog"
            @dataUp="QrResult"
            @close="isQrDialog = false"
            @Error = "Error">
        </QRreader>
    </div>
</template>
<script>
import Table from '../../components/Table.vue'
import QRreader from '../../components/QRreader.vue'
import CollectionDialog from '../../components/Admin/CollectionDialog.vue'

export default {
    components: {
        Table,
        CollectionDialog,
        QRreader
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
            registeredData:{collection:{uuid:null}},
            rules: {
                isbn:[
                    v => !!v || 'ISBNは必須です',
                    v => /\d{13}/.test(v) && v.length === 13|| 'ISBNは数字13桁です'
                ],
                ncd:[
                    v => !!v || 'NCDは必須です',
                    v => /\d{3}/.test(v) || 'NCD形式に一致しません'
                ]
            },
            isSelectSortDialog: false,
            isRentalDeteilDialog: false,
            isQrDialog: false,
            collectionPages:1,
            searchConditions: {
                sortRow:"uuid",
                sortDirection:0,
                uuid:"",
                ncd:"",
                note:"",
                page:1
            },
            isCollectionDialog:false,
            collectionDialogUuid:""
        }
    },
    mounted: function() {
        this.getCollections()
    },
    methods: {
        getCollections() {
            const query = "?sortRow=" + this.searchConditions.sortRow + "&sortDirection=" + this.searchConditions.sortDirection + "&ncd=" + this.searchConditions.ncd + "&note=" + this.searchConditions.note + "&uuid=" + this.searchConditions.uuid + "&page=" + this.searchConditions.page
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.collectionItems = []
            this.axios.get(this.$store.getters.apiEndpoint + '/collections' + query, options)
                .then((res) => {
                    this.collectionPages = Math.ceil(res.data.count / 20)
                    res.data.Collections.forEach(el => {
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
                    this.$emit('Error',e)
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
                        this.getCollections()
                        setTimeout(()=>{
                            console.log(res)
                            console.log(res.data)
                            this.registeredData = res.data
                            this.registerDialogTurn = 5
                        },2500)
                    }
                })
                .catch((e) => {
                    this.$emit('Error',e)
                    this.registerDialogMessage = "想定外のエラーが発生しました"
                    this.registerDialogTurn = 1
                })
        },
        edit(uuid) {
            this.collectionDialogUuid = uuid
            this.isCollectionDialog = true
        },
        search: function() {
            this.searchConditions.page = 1
            this.isSelectSortDialog = false
            this.getCollections()
        },
        searchReset: function() {
            this.searchConditions = {
                sortRow:"uuid",
                sortDirection:0,
                ncd:"",
                note:"",
                page:1
            }
        },
        QrResult: function(result) {
            this.isQrDialog = false
            this.searchConditions.uuid = result
        },
        Error: function(message) {
            this.$emit('Error', message)
        }
    },
    watch: {
        'searchConditions.page' : function() {
            this.getCollections()
        },
    }
}
</script>
