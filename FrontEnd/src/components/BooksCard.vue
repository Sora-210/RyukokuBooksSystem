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
                <p v-for="author in this.authors" :key="author.index">
                    {{ author }} / 著
                </p>
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
            "authors":"",
            "imgId":""
        }
    },
    props:[
        'id'
    ],
    computed: {
        bookImgUrl: function() {
            return "https://books.google.com/books/content/images/frontcover/" + this.imgId + "?fife=w800-h1200"
        },
        bookUrl: function() {
            return '/collection/' + "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
        }
    },
    mounted: function() {
        this.axios('https://www.googleapis.com/books/v1/volumes?q=isbn:' + this.id)
            .then((res) => {
                this.title = res.data.items[0].volumeInfo.title
                this.authors = res.data.items[0].volumeInfo.authors
                this.imgId = res.data.items[0].id
            })
            .catch((err) => {
                alert('Bookデータの取得中にエラーが発生しました')
                console.log(err)
            })
    }
}
</script>