<template>
    <div>
        <v-card>
            <v-card-title>
                リクエスト一覧
            </v-card-title>
            <v-btn text color="purple darken-3" class="ml-1 mb-3" @click="isSelectSortDialog = !isSelectSortDialog">
                絞り込み | 並べ替え
            </v-btn>
            <RequestTable :requestList=requestList @on-delete="deleteRequest">
            </RequestTable>
            <v-divider></v-divider>
                <v-card-actions>
                    <div class="text-right">
                        <v-pagination
                            v-model="searchConditions.page"
                            :length="requestPages"
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
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    label="リクエストジャンル"
                                    v-model="searchConditions.genre"
                                    :items="[{text:'図書リクエスト',value:1},{text:'その他',value:2}]"
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
                                    :items="[{text:'リクエストID',value:'id'}]"
                                    append-icon="fas fa-caret-down">
                                </v-select>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    label="順番"
                                    v-model="searchConditions.sortDirection"
                                    :items="[{text:'降順',value:0},{text:'昇順',value:1}]"
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
    </div>
</template>
<script>
import RequestTable from '../../components/Admin/RequestTable'

export default {
    components: {
        RequestTable
    },
    data: function() {
        return {
            requestList:[],
            isSelectSortDialog:false,
            requestPages: 1,
            searchConditions: {
                sortRow:"id",
                sortDirection:0,
                genre:"",
                page:1
            }
        }
    },
    mounted: function() {
        this.getRequests()
    },
    watch: {
        'searchConditions.page' : function() {
            this.getRequests()
        }
    },
    methods: {
        getRequests() {
            this.requestList = []
            const query = "?sortRow=" + this.searchConditions.sortRow + "&sortDirection=" + this.searchConditions.sortDirection + "&genre=" + this.searchConditions.genre + "&page=" + this.searchConditions.page
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.axios.get(`/requests${query}`, options)
                .then((getRes) => {
                    this.requestPages = Math.ceil(getRes.data.count / 20)
                    this.requestList = getRes.data.data
                })
                .catch((e) => {
                    if (e.response.status === 404) {
                        this.$emit('Error',"現在リクエストはありません");
                    } else {
                        console.error(e)
                        this.$router.push('/500');
                    }
                })
        },
        deleteRequest(id) {
            if (window.confirm(`RequestId:${id}を削除してよろしいですか?`)) {
                const options = {
                    headers: {
                        token: this.$store.getters.token
                    }
                }
                this.managerApi.delete(`/requests/${id}`, options)
                    .then(() => {
                        this.getRequests()
                        this.$emit('Success', '削除しました')
                    })
                    .catch(() => {
                        this.$router.push('/500')
                    })
            }
        },
        // 検索系関数
        search() {
            this.searchConditions.page = 1
            this.isSelectSortDialog = false
            this.getRequests()
        },
    },
}
</script>