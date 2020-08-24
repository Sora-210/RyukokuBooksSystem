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
                                v-model="searchConditions.uuid"
                                @click:append="isQrDialog = true"
                                append-icon="fas fa-qrcode">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="NDC"
                                v-model="searchConditions.ndc">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select
                                label="並び替え"
                                v-model="searchConditions.sortRow"
                                :items="[{text:'UUID',value:'uuid'},{text:'NDC',value:'ndc'},{text:'登録日',value:'registrationDate'}]"
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
            </v-card-actions>
            <v-card-actions class="d-flex justify-end">
                <v-btn color="warning" @click="Object.assign($data.searchConditions, $options.data().searchConditions)">リセット</v-btn>
                <v-btn color="success" @click="search">検索</v-btn>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-text>
                検索結果: {{ collectionCount }} 件
            </v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" v-for="collection in collections" :key="collection.uuid">
                        <BooksCardRow
                            :id="collection.isbn"
                            :uuid="collection.uuid"
                            style="margin:5px;"
                            @error="emitError">
                        </BooksCardRow>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="text-right">
                    <v-pagination
                        v-model="page"
                        :length="collectionPage"
                        next-icon="fas fa-caret-right"
                        prev-icon="fas fa-caret-left">
                    </v-pagination>
                </div>
            </v-card-actions>
        </v-card>
        <QRreader :isDialog="isQrDialog" @dataUp="resultQr" @close="isQrDialog = false" @error="emitError">
        </QRreader>
    </div>
</template>
<script>
import BooksCardRow from '../components/BooksCardRow.vue'
import QRreader from '../components/QRreader.vue'
export default {
    components: {
        QRreader,
        BooksCardRow
    },
    data: function() {
        return {
            collections: [],
            page: 1,
            collectionPage: 0,
            collectionCount: 0,
            searchConditions: {
                sortRow: 'registrationDate',
                sortDirection: 'DESC',
                uuid: '',
                ndc: ''
            },
            isQrDialog: false
        }
    },
    mounted: function() {
        this.getCollections()
    },
    watch: {
        page : function() {
            this.getCollections()
        }
    },
    methods: {
        async getCollections() {
            let query = `?sortRow=${this.searchConditions.sortRow}&sortDirection=${this.searchConditions.sortDirection}`;
            query += `&ndc=${this.searchConditions.ndc}&uuid=${this.searchConditions.uuid}`;
            query += `&page=${this.page}`;
            await this.managerApi.get(`/collections${query}`)
                .then((getRes) => {
                    this.collectionCount = getRes.data.count
                    this.collectionPage = Math.ceil(getRes.data.count / 20)
                    this.collections = getRes.data.data
                })
                .catch((e) => {
                    this.sendStatus = false
                    if (e.response.status === 404) {
                        this.$emit('error',"コンテンツが見つかりません")
                    } else {
                        this.$router.push('/500')
                    }
                })
        },
        search: function() {
            this.page = 1
            this.getCollections()
        },
        resultQr(result) {
            this.isQrDialog = false
            this.searchConditions.uuid = result
        },
        emitError: function(message) {
            this.$emit('error', message)
        }
    }
}
</script>