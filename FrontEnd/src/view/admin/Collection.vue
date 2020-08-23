<template>
    <div>
        <v-card>
            <v-card-title>
                蔵書一覧
            </v-card-title>
            <v-btn
                @click="isRegisterDialog = !isRegisterDialog"
                class="ml-8 mb-5"
                color="success">
                蔵書登録
            </v-btn>
            <v-divider></v-divider>
            <v-btn text color="purple darken-3" class="ml-1 mb-3" @click="isSelectSortDialog = !isSelectSortDialog">
                絞り込み | 並べ替え
            </v-btn>
            <CollectionTable :collectionList=collectionList @on-edit="edit">
            </CollectionTable>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="text-right">
                    <v-pagination
                        v-model="searchConditions.page"
                        :length="collectionPages"
                        next-icon="fas fa-caret-right"
                        prev-icon="fas fa-caret-left">
                    </v-pagination>
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
                                    v-model="searchConditions.uuid"
                                    @click:append="isQrDialog = true"
                                    append-icon="fas fa-qrcode">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="備考"
                                    v-model="searchConditions.note">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="NDC"
                                    v-model="searchConditions.ndc">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    label="並び替え"
                                    v-model="searchConditions.sortRow"
                                    :items="[{text:'UUID',value:'uuid'},{text:'登録日',value:'registrationDate'}]"
                                    append-icon="fas fa-caret-down">
                                </v-select>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    label="順番"
                                    v-model="searchConditions.sortDirection"
                                    :items="[{text:'降順',value:'DESC'},{text:'昇順',value:'ASC'}]"
                                    append-icon="fas fa-caret-down">
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="d-flex justify-end">
                    <v-btn color="warning" @click="Object.assign($data.searchConditions, $options.data().searchConditions)">
                        リセット
                    </v-btn>
                    <v-btn color="success" @click="search">
                        検索
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <CollectionRegisterDialog :isDialog=isRegisterDialog @reload="getCollections()" @close="isRegisterDialog = false">
        </CollectionRegisterDialog>
        <collection-dialog
            :isCollectionDialog="isCollectionDialog"
            :collectionUuid="collectionDialogUuid"
            @reload="getCollections"
            @close="isCollectionDialog = false"
            @success="emitSuccess"
            @error = "emitError">
        </collection-dialog>
        <QRreader
            :isDialog="isQrDialog"
            @dataUp="resultQr"
            @close="isQrDialog = false"
            @error = "emitError">
        </QRreader>
    </div>
</template>
<script>
import QRreader from '../../components/QRreader.vue'
import CollectionTable from '../../components/admin/collection/CollectionTable'
import CollectionRegisterDialog from '../../components/admin/collection/CollectionRegisterDialog'
import CollectionDialog from '../../components/admin/collection/CollectionDialog'

export default {
    components: {
        CollectionTable,
        CollectionDialog,
        QRreader,
        CollectionRegisterDialog
    },
    data: function() {
        return {
            collectionList:[],
            isSelectSortDialog: false,
            collectionPages:1,
            searchConditions: {
                sortRow:"uuid",
                sortDirection:"DESC",
                uuid:"",
                ndc:"",
                note:"",
                page:1
            },
            isQrDialog: false,
            isRegisterDialog: false,
            isCollectionDialog:false,
            collectionDialogUuid:""
        }
    },
    mounted: function() {
        this.getCollections()
    },
    watch: {
        'searchConditions.page' : function() {
            this.getCollections()
        },
    },
    methods: {
        getCollections() {
            this.collectionItems = []
            const query = "?sortRow=" + this.searchConditions.sortRow + "&sortDirection=" + this.searchConditions.sortDirection + "&ndc=" + this.searchConditions.ndc + "&note=" + this.searchConditions.note + "&uuid=" + this.searchConditions.uuid + "&page=" + this.searchConditions.page+ "&limit=20"
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.managerApi.get(`/collections${query}`, options)
                .then((getResponse) => {
                    this.collectionPages = Math.ceil(getResponse.data.count / 20)
                    this.collectionList = getResponse.data.data
                })
                .catch((e) => {
                    if (e.response.status === 404) {
                        this.$emit('error',"データが見つかりません")
                    } else {
                        this.$router.push('/500')
                    }
                })
        },
        edit(uuid) {
            this.collectionDialogUuid = uuid
            this.isCollectionDialog = true
        },
        search() {
            this.searchConditions.page = 1
            this.isSelectSortDialog = false
            this.getCollections()
        },
        resultQr(result) {
            this.isQrDialog = false
            this.searchConditions.uuid = result
        },
        emitSuccess(message) {
            this.$emit('success', message)
        },
        emitError(message) {
            this.$emit('error', message)
        }
    },
}
</script>