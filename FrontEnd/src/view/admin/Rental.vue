<template>
    <div>
        <v-card>
            <v-card-title>
                貸出一覧
            </v-card-title>
            <div class="table mt-7 mx-1 sp-row-scroll">
                <v-btn text color="purple darken-3" class="ml-1 mb-3" @click="isSelectSortDialog = !isSelectSortDialog">
                    絞り込み | 並べ替え
                </v-btn>
                <RentalTable :rentalsList=rentalsList @on-rental-detail-dialog="onRentalDetailDialog">
                </RentalTable>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="text-right">
                    <v-pagination
                        v-model="searchConditions.page"
                        :length="rentalsPages"
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
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    label="ステータス"
                                    v-model="searchConditions.status"
                                    :items="[{text:'貸出中',value:1},{text:'返却済',value:2},{text:'未返却[期限切れ]',value:3}]"
                                    append-icon="fas fa-caret-down">
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    label="並び替え"
                                    v-model="searchConditions.sortRow"
                                    :items="[{text:'レンタルID',value:'id'},{text:'貸出日',value:'startDay'},{text:'返却日',value:'returnDay'}]"
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
                    <v-btn color="warning" @click="Object.assign($data.searchConditions, $options.data().searchConditions)">リセット</v-btn>
                    <v-btn color="success" @click="search">検索</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <rental-dialog
            :isRentalDetailDialog="isRentalDetailDialog"
            :rentalId="Number(rentalDetailDialogRentalid)"
            @close="isRentalDetailDialog = false"
            @error="error">
        </rental-dialog>
        <QRreader :isDialog="isQrDialog" @dataUp="resultQr" @close="isQrDialog = false" @error="error">
        </QRreader>
    </div>
</template>
<script>
import RentalDialog from '../../components/admin/rental/RentalDialog'
import RentalTable from '../../components/admin/rental/RentalTable'
import QRreader from '../../components/QRreader'
export default {
    components: {
        RentalDialog,
        QRreader,
        RentalTable
    },
    data: function() {
        return {
            rentalsList:[],
            rentalsPages:1,
            isSelectSortDialog: false,
            isRentalDetailDialog: false,
            rentalDetailDialogRentalid: "",
            isQrDialog: false,
            searchConditions: {
                sortRow:"id",
                sortDirection:'DESC',
                uuid:"",
                status:"",
                page:1
            },
            selectList: {
                schoolGradeList:{
                    11:"中等部 1年",
                    12:"中等部 2年",
                    13:"中等部 3年",
                    21:"高等部 1年",
                    22:"高等部 2年",
                    23:"高等部 3年",
                },
                ClassList:{
                    1:"A",
                    2:"B",
                    3:"C",
                    4:"D",
                    5:"E",
                    6:"F",
                    7:"G",
                    8:"Z・V・S",
                }
            },
        }
    },
    mounted: function() {
        this.requestApi()
    },
    watch: {
        'searchConditions.page' : function() {
            this.requestApi()
        }
    },
    methods: {
        requestApi() {
            const query = "?sortRow=" + this.searchConditions.sortRow + "&sortDirection=" + this.searchConditions.sortDirection + "&uuid=" + this.searchConditions.uuid + "&status=" + this.searchConditions.status + "&page=" + this.searchConditions.page
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.managerApi.get(`/rentals${query}`, options)
                .then((getRes) => {
                    this.rentalsList = getRes.data.Rentals
                    this.rentalsPages = Math.ceil(getRes.data.count / 20)
                    this.rentalsList = getRes.data.data
                })
                .catch((e) => {
                    if (e.response.status === 404) {
                        this.$emit('error', "貸出データが見つかりませんでした")
                    } else {
                        this.$router.push('/500')
                    }
                })
        },
        search() {
            this.searchConditions.page = 1
            this.isSelectSortDialog = false
            this.requestApi()
        },
        onRentalDetailDialog(rentalId) {
            this.rentalDetailDialogRentalid = rentalId
            this.isRentalDetailDialog = true
        },
        resultQr(result) {
            this.isQrDialog = false
            this.searchConditions.uuid = result
        },
        error(message) {
            this.$emit('error', message)
        }
    },
}
</script>
<style scoped>
.dialog {
    width:70%;
}
@media screen and (max-width: 600px){
    .dialog {
        width:100%;
    }
}
</style>