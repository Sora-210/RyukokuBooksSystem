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
                <table>
                    <tr class="tableTitle">
                        <th>レンタルID</th>
                        <th>ステータス</th>
                        <th>UUID</th>
                        <th>貸出日</th>
                        <th>返却日</th>
                        <th></th>
                    </tr>
                    <tr class="tableItem" v-for="item in this.rentalsList" :key="item.index">
                        <td>{{ item.id }}</td>

                        <td v-if="item.return_day === null">
                            <span style="color:blue;">貸出中</span>
                        </td>
                        <td v-else>
                            <span style="color:green;">返却済</span>
                        </td>

                        <td><router-link :to="`/collection/` + item.uuid">{{ item.uuid}}</router-link></td>
                        <td>{{ item.start_day }}</td>

                        <td v-if="item.return_day === null">
                            -
                        </td>
                        <td v-else>
                            {{ item.return_day}}
                        </td>
                        
                        <td>
                            <v-btn size="small" color="primary" text @click="detailDialog(item.id)">
                                <v-icon>fas fa-info</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </table>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="text-right">
                    <v-pagination
                    v-model="searchConditions.page"
                    next-icon="fas fa-caret-right"
                    prev-icon="fas fa-caret-left"
                    :length="rentalsPages"
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
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    append-icon="fas fa-caret-down"
                                    :items="[{text:'貸出中',value:true},{text:'返却済',value:false}]"
                                    v-model="searchConditions.status"
                                    label="ステータス"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    append-icon="fas fa-caret-down"
                                    :items="[{text:'レンタルID',value:'id'},{text:'貸出日',value:'start_day'},{text:'返却日',value:'return_day'}]"
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
        <v-dialog v-model="isRentalDeteilDialog" width="70%">
            <v-card>
                <v-card-title>
                    貸出情報
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <h3>レンタルID</h3>
                    <p>{{ this.RentalDeteilData.id }}</p>
                    <h3>UUID</h3>
                    <p>{{ this.RentalDeteilData.uuid }}</p>
                    <h3>年</h3>
                    <p>{{ this.RentalDeteilData.year }}</p>
                    <h3>借りた人</h3>
                    <p>{{ this.selectLists.schoolGradeList[this.RentalDeteilData.grade] }}/{{ this.selectLists.ClassList[this.RentalDeteilData.class]}}組/{{ this.RentalDeteilData.number}}番</p>
                    <p>{{ this.RentalDeteilData.name }}</p>
                    <h3>貸出日</h3>
                    <p>{{ this.RentalDeteilData.start_day }}</p>
                    <h3>返却日</h3>
                    <p>{{ this.RentalDeteilData.return_day }}</p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="success" @click="isRentalDeteilDialog = false">閉じる</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <QRreader :isQrDialog="isQrDialog" @dataUp="QrResult" @close="isQrDialog = false" @Error="Error">
        </QRreader>
    </div>
</template>
<script>
import QRreader from '../../components/QRreader.vue'

export default {
    components: {
        QRreader,
    },
    data: function() {
        return {
            rentalsList:[],
            rentalsPages:1,
            isSelectSortDialog: false,
            isRentalDeteilDialog: false,
            RentalDeteilData: {},
            isQrDialog: false,
            searchConditions: {
                sortRow:"id",
                sortDirection:0,
                uuid:"",
                status:"",
                page:1
            },
            selectLists: {
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
            }
        }
    },
    mounted: function() {
        this.requestApi()
    },
    methods: {
        requestApi: function() {
            const query = "?sortRow=" + this.searchConditions.sortRow + "&sortDirection=" + this.searchConditions.sortDirection + "&uuid=" + this.searchConditions.uuid + "&status=" + this.searchConditions.status + "&page=" + this.searchConditions.page
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.axios.get(this.$store.getters.apiEndpoint + '/rentals' + query, options)
                .then((res) => {
                    this.rentalsList = res.data.Rentals
                    this.rentalsPages = Math.ceil(res.data.count / 20)
                })
                .catch((e) => {
                    this.$emit('Error',e)
                })
        },
        search: function() {
            this.searchConditions.page = 1
            this.isSelectSortDialog = false
            this.requestApi()
        },
        searchReset: function() {
            this.searchConditions = {
                sortRow:"id",
                sortDirection:0,
                uuid:"",
                status:"",
                page:1
            }
        },
        detailDialog: async function(rentalId) {
            this.isRentalDeteilDialog = true
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            try {
                const Res = await this.axios.get(this.$store.getters.apiEndpoint + "/rentals/" + rentalId, options)
                this.RentalDeteilData = Res.data
            } catch(e) {
                this.$emit('Error', e)
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
            this.requestApi()
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


.dialog {
    width:70%;
}
@media screen and (max-width: 600px){
    .dialog {
        width:100%;
    }
}
</style>