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
                                    label="NDC"
                                    v-model="searchConditions.ndc"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    append-icon="fas fa-caret-down"
                                    :items="[{text:'UUID',value:'uuid'},{text:'登録日',value:'registrationDate'}]"
                                    v-model="searchConditions.sortRow"
                                    label="並び替え"
                                ></v-select>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    append-icon="fas fa-caret-down"
                                    :items="[{text:'降順',value:'DESC'},{text:'昇順',value:'ASC'}]"
                                    v-model="searchConditions.sortDirection"
                                    label="順番"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="d-flex justify-end">
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
                        <div>
                            <v-text-field
                                outlined
                                label="ISBN"
                                v-model="registerData.isbn"
                                :rules="rules.isbn"
                            >
                            </v-text-field>
                        </div>
                        <div class="d-flex justify-end">
                            <v-btn
                                color="primary"
                                @click="registerFirst"
                            >
                            次へ
                            </v-btn>
                            <v-btn text @click="reset">
                                キャンセル
                            </v-btn>
                        </div>
                    </div>
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
                        <div>
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
                                label="NDC"
                                v-model="registerData.ndc"
                                :rules="rules.ndc"
                            >
                            </v-text-field>
                            <v-text-field
                                outlined
                                label="備考"
                                v-model="registerData.note"
                            >
                            </v-text-field>
                        </div>
                        <div class="d-flex justify-end">
                            <v-btn
                                color="primary"
                                @click="registerSecond"
                            >
                                登録する
                            </v-btn>
                            <v-btn text @click="reset">
                                キャンセル
                            </v-btn>
                        </div>
                    </div>
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
                                        v-model="registeredData.registrationDate"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        outlined
                                        disabled
                                        label="UUID"
                                        v-model="registeredData.uuid"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        outlined
                                        disabled
                                        label="ISBN"
                                        v-model="registeredData.isbn"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        outlined
                                        disabled
                                        label="NDC"
                                        v-model="registeredData.ndc"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        outlined
                                        disabled
                                        label="備考"
                                        v-model="registeredData.note"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols=12 sm=4>
                                    <v-img
                                        :src="this.$store.getters.fileEndpoint + '/' + this.registeredData.uuid + '.png'"
                                    >
                                    </v-img>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-divider></v-divider>
                        <v-card-actions class="d-flex justify-end">
                            <v-btn
                                color="primary"
                                @click="registerDialog = false"
                            >
                            閉じる
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
        <collection-dialog
            :isCollectionDialog="isCollectionDialog"
            :collectionUuid="collectionDialogUuid"
            @reload="getCollections"
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
                    title:"NDC",
                    variableName:"ndc"
                },
                {
                    title:"登録日",
                    variableName:"registrationDate"
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
            registerDialogTurn : 1,
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
            },
            isSelectSortDialog: false,
            isRentalDeteilDialog: false,
            isQrDialog: false,
            collectionPages:1,
            searchConditions: {
                sortRow:"uuid",
                sortDirection:"DESC",
                uuid:"",
                ndc:"",
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
        async getCollections() {
            try {
                const query = "?sortRow=" + this.searchConditions.sortRow + "&sortDirection=" + this.searchConditions.sortDirection + "&ndc=" + this.searchConditions.ndc + "&note=" + this.searchConditions.note + "&uuid=" + this.searchConditions.uuid + "&page=" + this.searchConditions.page+ "&limit=20"
                const options = {
                    headers: {
                        token: this.$store.getters.token
                    }
                }
                this.collectionItems = []
                const getResponse = await this.axios.get(`${this.$store.getters.apiEndpoint}/collections${query}`, options)
                this.collectionPages = Math.ceil(getResponse.data.count / 20)
                getResponse.data.data.forEach(el => {
                    this.collectionItems.push({
                        uuid: el.uuid,
                        isbn: el.isbn,
                        ndc: el.ndc,
                        registrationDate: el.registrationDate,
                        note: el.note,
                        edit: {
                            text:"編集",
                            emitName:"Edit",
                            emitVariable:el.uuid
                        }
                    })
                });
            } catch(e) {
                if (e.response.status === 404) {
					this.$emit('Error',"データが見つかりません")
					this.sendStatus = false
				} else {
                    console.error(e)
                    this.sendStatus = false
					this.$router.push('/500')
				}
            }
        },
        reset() {
            this.registerDialog = false
            this.registerDialogTurn = 1
            this.registerData = {isbn:"",title:"",ndc:"",note:""}
        },
        registerFirst() {
            this.registerDialogTurn = 2
            this.axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.registerData.isbn}`)
                .then((res) => {
                    if (res.data.items.length === 0) {
                        this.$emit('Error','このISBNは存在しないか登録できない書籍です')
                        this.registerDialogTurn = 1
                    } else {
                        setTimeout(()=>{
                            this.registerData.title = res.data.items[0].volumeInfo.title
                            this.registerDialogTurn = 3
                        },2500)
                    }
                })
                .catch((e) => {
                    this.registerDialogTurn = 1
                    if (e.response.status === 500) {
                        console.error(e)
                        this.$router.push('/500')
                    }
                })
        },
        async registerSecond() {
            try {
                this.registerDialogTurn = 4
                const options = {
                    headers: {
                        token: this.$store.getters.token
                    }
                }
                const postResponse = await this.axios.post(`${this.$store.getters.apiEndpoint}/collections`, this.registerData, options)
                this.getCollections()
                console.log(postResponse.data)
                setTimeout(()=>{
                    this.registeredData = postResponse.data
                    this.registerDialogTurn = 5
                },2500)
            } catch(e) {
                this.registerDialogTurn = 1
                if (e.response.status === 400) {
					this.$emit('Error',"登録に失敗しました")
					this.sendStatus = false
				} else {
                    this.sendStatus = false
                    console.error(e)
					this.$router.push('/500')
				}
            }
            
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
                sortDirection:"DESC",
                uuid:"",
                ndc:"",
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