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
                <h3>
                    貸出情報:× [未登録]
                </h3>
                <v-btn
                    large
                    color="success"
                >
                    リクエストする
                </v-btn>
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
            })
            .catch((err) => {
                alert('Bookデータの取得中にエラーが発生しました')
                console.log(err)
            })
    }
}
</script>