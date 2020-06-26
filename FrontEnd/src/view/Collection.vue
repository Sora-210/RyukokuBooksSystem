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
                            {{ author }} |
                        </span>
                    </h2>
                    <table
                        class="rentalInfo mt-4"
                    >
                        <tr>
                            <th>
                                貸出情報
                            </th>
                            <th>
                                <i class="far fa-circle" style="color:green;"></i>
                            </th>
                        </tr>
                    </table>
                    <br>
                    <v-btn
                        large
                        color="success"
                        @click="lendOverlayStatus = !lendOverlayStatus"
                    >
                        借りる
                    </v-btn>
                    <v-btn
                        dark
                        large
                        color="red"
                        class="ml-5"
                    >
                        返す
                    </v-btn>
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
                                    {{ author }} |
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
        </div>
        <div v-else>
            <h2> 404 NotFount </h2>
        </div>
        <v-overlay
            absolute
            :value="lendOverlayStatus"
        >
            <v-icon
                @click="lendOverlayStatus = !lendOverlayStatus"
            >fas fa-times</v-icon>
            <v-card
                class="pa-10"
            >
                <v-card-title>
                    貸し出し手続き
                </v-card-title>
                <v-select
                    :items=schoolGradeLists
                    append-icon="fas fa-caret-down"
                    label="学年"
                    outlined
                ></v-select>
                <v-text-field
                    v-model="first"
                    label="クラス"
                    outlined
                ></v-text-field>
                <v-text-field
                    v-model="first"
                    label="番号"
                    outlined
                ></v-text-field>
                <v-text-field
                    v-model="first"
                    label="名前"
                    outlined
                ></v-text-field>
                <v-btn
                    color="success"
                >
                    申請する
                </v-btn>
            </v-card>
        </v-overlay>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            resStatus:false,
            lendOverlayStatus:false,
            data:{
                title:"",
                authors:"",
                isbn:"",
                img:"",
                publisher:"",
                publishedDate:""
            },
            schoolGradeLists:[
                "中等部 1年",
                "中等部 2年",
                "中等部 3年",
                "高等部 1年",
                "高等部 2年",
                "高等部 3年",
            ]
        }
    },
    mounted: function() {
        this.axios('https://www.googleapis.com/books/v1/volumes?q=isbn:4844333933')
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

v-card {
    background-color:aqua;
}
</style>