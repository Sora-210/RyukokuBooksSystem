<template>
    <div>
        <v-card>
            <v-img
                :src="bookImgUrl"
            ></v-img>
            <v-card-title>
                {{ title }}
            </v-card-title>
            <v-card-text>
                {{ author }}
            </v-card-text>
            <v-card-actions>
                <v-btn>
                    借りる
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name:'BooksCard',
    data: function() {
        return {
            "title":"",
            "author":""
        }
    },
    props:[
        'id'
    ],
    computed: {
        bookImgUrl: function() {
            return 'https://cover.openbd.jp/' + this.id + '.jpg'
        },
        bookUrl: function() {
            return '/book/' + this.id
        }
    },
    mounted: function() {
        this.axios('https://api.openbd.jp/v1/get?isbn=' + this.id)
            .then((res) => {
                this.title = res.data[0].summary.title
                this.author = res.data[0].summary.author
            })
            .catch((err) => {
                alert('Bookデータの取得中にエラーが発生しました')
                console.log(err)
            })
    }
}
</script>