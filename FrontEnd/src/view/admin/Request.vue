<template>
    <div>
        <v-card>
            <v-card-title>
                リクエスト一覧
            </v-card-title>
            <v-btn text color="purple darken-3" class="ml-1 mb-3" @click="isSelectSortDialog = !isSelectSortDialog">
                絞り込み | 並べ替え
            </v-btn>
            <Table
                :columnNames=listNames
                :listItems=requestLists
                @Delete="deleteRequest"
            >
            </Table>
            <v-divider></v-divider>
                <v-card-actions>
                    <div class="text-right">
                        <v-pagination
                        v-model="searchConditions.page"
                        next-icon="fas fa-caret-right"
                        prev-icon="fas fa-caret-left"
                        :length="requestPages"
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
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    label="リクエストジャンル"
                                    append-icon="fas fa-caret-down"
                                    :items="[{text:'図書リクエスト',value:1},{text:'その他',value:2}]"
                                    v-model="searchConditions.genre"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select
                                    append-icon="fas fa-caret-down"
                                    :items="[{text:'リクエストID',value:'id'}]"
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
    </div>
</template>
<script>
import Table from '../../components/Table.vue'

export default {
    name:"Request",
    components: {
        Table
    },
    data: function() {
        return {
            listNames:[
                {
                    title:"リクエストID",
                    variableName:"id"
                },
                {
                    title:"genre",
                    variableName:"genre"
                },
                {
                    title:"内容",
                    variableName:"content"
                },
                {
                    title:"削除",
                    variableName:"delete"
                }
            ],
            requestLists:[],
            requestGenre:{
                1:'図書リクエスト',
                2:'その他',
            },
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
    methods: {
        deleteRequest: function(id) {
            if (window.confirm('RequestId:' + id + 'を削除してよろしいですか?')) {
                const options = {
                    headers: {
                        token: this.$store.getters.token
                    }
                }
                this.axios.delete(this.$store.getters.apiEndpoint + '/requests/' + id, options)
                    .then((res) => {
                        console.log(res)
                        this.getRequests()
                        alert('削除しました')
                    })
                    .catch((e) => {
                        this.$emit('Error',e)
                    })
            }
        },
        getRequests: function() {
            const query = "?sortRow=" + this.searchConditions.sortRow + "&sortDirection=" + this.searchConditions.sortDirection + "&genre=" + this.searchConditions.genre + "&page=" + this.searchConditions.page
            this.requestLists = []
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.axios.get(this.$store.getters.apiEndpoint + '/requests' + query, options)
                .then((res) => {
                    this.requestPages = Math.ceil(res.data.count / 20)
                    res.data.Requests.forEach(el => {
                        this.requestLists.push({
                            id:el.id,
                            genre:this.requestGenre[el.genre],
                            content:el.content,
                            delete:{
                                text:"削除",
                                emitName:"Delete",
                                emitVariable:el.id
                            }
                        })
                    });
                })
                .catch((e) => {
                    this.$emit('Error',e)
                })
        },
        // 検索系関数
        search: function() {
            this.searchConditions.page = 1
            this.isSelectSortDialog = false
            this.getRequests()
        },
        searchReset: function() {
            this.searchConditions = {
                sortRow:"id",
                sortDirection:0,
                genre:"",
                page:1
            }
        },
    },
    watch: {
        'searchConditions.page' : function() {
            this.getRequests()
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