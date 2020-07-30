<template>
    <div>
        <v-card>
            <v-card-title>
                蔵書一覧 | 検索
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
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
                                label="NDC"
                                v-model="searchConditions.ndc"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select
                                append-icon="fas fa-caret-down"
                                :items="[{text:'UUID',value:'uuid'},{text:'NDC',value:'ndc'},{text:'登録日',value:'registrationData'}]"
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
            </v-card-actions>
            <v-card-actions class="d-flex justify-end">
                <v-btn color="warning" @click="searchReset">リセット</v-btn>
                <v-btn color="success" @click="search">検索</v-btn>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-text>
                検索結果: {{ targetCollectionCount }} 件
            </v-card-text>
            <v-container>
                <!-- <v-row>
                    <v-col
                        cols="6"
                        sm="3"
                        v-for="Collection in Collections" :key="Collection.uuid"
                    >
                        <BookCard
                            :id="Collection.isbn"
                            :uuid="Collection.uuid"
                            style="margin:5px;"
                            @Error="Error"
                        >
                        </BookCard>
                    </v-col>
                </v-row> -->
                <v-row>
                    <v-col
                        cols="12"
                        v-for="Collection in Collections" :key="Collection.uuid"
                    >
                        <BooksCardRow
                            :id="Collection.isbn"
                            :uuid="Collection.uuid"
                            style="margin:5px;"
                            @Error="Error"
                        >
                        </BooksCardRow>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="text-right">
                    <v-pagination
                    v-model="page"
                    next-icon="fas fa-caret-right"
                    prev-icon="fas fa-caret-left"
                    :length="CollectionPage"
                    ></v-pagination>
                </div>
            </v-card-actions>
        </v-card>
        <QRreader :isQrDialog="isQrDialog" @dataUp="QrResult" @close="isQrDialog = false" @Error="Error">
        </QRreader>
    </div>
</template>
<script>
// import BookCard from '../components/BooksCard.vue'
import BooksCardRow from '../components/BooksCardRow.vue'
import QRreader from '../components/QRreader.vue'

export default {
    components: {
        // BookCard,
        QRreader,
        BooksCardRow
    },
    data: function() {
        return {
            Collections:[],
            page:1,
            CollectionPage:0,
            targetCollectionCount:0,
            searchConditions: {
                sortRow:"registrationData",
                sortDirection:0,
                uuid:"",
                ndc:""
            },
            isQrDialog:false
        }
    },
    mounted: function() {
        this.getCollections()
    },
    methods: {
        getCollections() {
            let query = `?sortRow=${this.searchConditions.sortRow}&sortDirection=${this.searchConditions.sortDirection}`
            query += `&ndc=${this.searchConditions.ndc}&uuid=${this.searchConditions.uuid}`
            query += `&page=${this.page}`
            this.axios.get(this.$store.getters.apiEndpoint + '/collections' + query)
                .then((res) => {
                    this.targetCollectionCount = res.data.count
                    this.CollectionPage = Math.ceil(res.data.count / 20)
                    this.Collections = res.data.Collections
                    console.log(this.Collections)
                })
                .catch((e) => {
                    this.$emit('Error',e)
                })
        },
        search: function() {
            this.page = 1
            this.getCollections()
        },
        searchReset: function() {
            this.searchConditions = {
                sortRow:"registrationData",
                sortDirection:0,
                uuid:"",
                ndc:""
            }
        },
        QrResult: function(result) {
            this.isQrDialog = false
            this.searchConditions.uuid = result
        },
        Error: function(message) {
            this.$emit('Error',message)
        }
    },
    watch: {
        page : function() {
            this.getCollections()
        }
    }
}
</script>