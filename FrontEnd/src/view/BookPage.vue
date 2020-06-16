<template>
    <div pa-6 ma-4>
        <v-row>
            <v-col
                cols=3
            >
                <v-img
                    :src=this.bookdata.cover
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
                    {{ this.bookdata.title }}
                </h1>
                <h2>
                    {{ this.bookdata.author }}
                </h2>
                <!-- <h3>
                    貸出情報:× [未登録]
                </h3> -->
                <table
                    class="rentalInfo"
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
                >
                    リクエストする
                </v-btn>
            </v-col>
        </v-row>
        <v-divider>
        </v-divider>
        <v-row>
            <v-col>
                <v-simple-table>
                <tbody>
                        <tr>
                        <td>タイトル</td>
                        <td>{{ this.bookdata.title }}</td>
                        </tr>
                        <tr>
                        <td>著作</td>
                        <td>{{ this.bookdata.author }}</td>
                        </tr>
                        <tr>
                        <td>ISBN</td>
                        <td>{{ this.bookdata.isbn }}</td>
                        </tr>
                        <tr>
                        <td>出版社</td>
                        <td>{{ this.bookdata.publisher }}</td>
                        </tr>
                        <tr>
                        <td>発売日時</td>
                        <td>{{ this.bookdata.pubdate }}</td>
                        </tr>
                    </tbody>
            </v-simple-table>
            </v-col>
            
        </v-row>
        
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            bookdata:{
            }
        }
    },
    mounted: function() {
        this.axios('https://api.openbd.jp/v1/get?isbn=' + this.$route.params.isbn)
            .then((res) => {
                this.bookdata = res.data[0].summary
                console.log(this.bookdata)
            })
            .catch((err) => {
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
</style>