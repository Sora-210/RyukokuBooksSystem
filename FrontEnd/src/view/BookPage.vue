<template>
    <div pa-6 ma-4>
        <div v-if="this.resStatus">
            <v-row>
                <v-col
                    cols=3
                >
                    <v-img
                        :src=this.data.img
                    >
                    </v-img>
                </v-col>
                <v-col
                    cols=1
                >
                </v-col>
                <v-col
                    cols=8
                >
                    <h1>
                        {{ this.data.title }}
                    </h1>
                    <h2>
                        |
                        <span v-for="author in this.data.authors" :key="author.index">
                            {{ author }} / 著 |
                        </span>
                    </h2>
                    <br>
                    <!-- <v-btn
                        v-if="!this.collection.status"
                        large
                        color="success"
                    >
                        リクエストする
                    </v-btn> -->
                </v-col>
            </v-row>
            <v-divider>
            </v-divider>
            <v-row>
                <v-col>
                    <p style="font-size:20px;">
                        - BookInfo
                    </p>
                    <v-simple-table>
                        <tbody>
                            <tr>
                            <td>タイトル</td>
                            <td>{{ this.data.title }}</td>
                            </tr>
                            <tr>
                            <td>著作</td>
                            <td>
                                |
                                <span v-for="author in this.data.authors" :key="author.index">
                                    {{ author }} / 著 |
                                </span>
                            </td>
                            </tr>
                            <tr>
                            <td>ISBN</td>
                            <td>{{ this.data.isbn }}</td>
                            </tr>
                            <tr>
                            <td>出版社</td>
                            <td>{{ this.data.publisher }}</td>
                            </tr>
                            <tr>
                            <td>発売日時</td>
                            <td>{{ this.data.publishedDate }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-col>
            </v-row>
            <v-divider>
            </v-divider>
            <div
                v-if="!this.collection.status"
            >
                <v-row>
                    <v-col>
                        <p style="font-size:20px;">
                            - 蔵書Info
                        </p>
                        <v-simple-table>
                            <tbody>
                                <tr
                                    v-for="item in this.collection.items" :key="item.index"
                                >
                                    <td>UUID</td>
                                    <td><router-link :to="collectionUrl(item)">{{ item }}</router-link></td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div v-else>
            <h2> 404 NotFount </h2>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            resStatus:false,
            data:{
                title:"",
                authors:"",
                isbn:"",
                img:"",
                publisher:"",
                publishedDate:""
            },
            collection:{
                status:false,
                items:[
                    "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                    "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
                ]
            }
        }
    },
    mounted: function() {
        this.axios('https://www.googleapis.com/books/v1/volumes?q=isbn:' + this.$route.params.isbn)
            .then((res) => {
                this.resStatus = true
                const ResData = res.data.items[0]
                this.data.title = ResData.volumeInfo.title
                this.data.authors = ResData.volumeInfo.authors
                this.data.isbn = ResData.volumeInfo.industryIdentifiers[1].identifier
                this.data.img = "https://books.google.com/books/content/images/frontcover/" + ResData.id + "?fife=w800-h1200"
                this.data.publisher = ResData.volumeInfo.publisher
                this.data.publishedDate = ResData.volumeInfo.publishedDate
                console.log(this.data)
            })
            .catch((err) => {
                this.resStatus = false
                alert('Bookデータの取得中にエラーが発生しました')
                console.log(err)
            })
    },
    methods: {
        collectionUrl: function(uuid) {
            return "/collection/" + uuid
        }
    }
}
</script>

<style scoped>
.rentalInfo {
    padding:5px;
    border: 1px solid #000000;
    border-collapse:collapse;
}
.rentalInfo tr th{
    border: 1px solid #000000;
    padding: 5px;
}
</style>