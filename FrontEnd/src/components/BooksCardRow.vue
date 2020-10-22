<template>
    <div>
        <v-card @click="link" class="d-flex .justify-start">
            <v-row>
                <v-col cols=5 sm=4 md=2>
                    <v-img :src=bookImgUrl class="ma-2"></v-img>
                </v-col>
                <v-col cols=7 sm=8 md=10>
                    <v-card-title class="title">
                        {{ title }}
                    </v-card-title>
                    <v-card-text class="author">
                        <p v-for="author in this.authors" :key="author.index">
                            {{ author }} / 著
                        </p>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            "title":"",
            "authors":"",
            "imgId":""
        }
    },
    props: {
        isbn: {
            type: Number,
            default: 0
        },
        uuid: {
            type: String,
            default: ''
        }
    },
    computed: {
        bookImgUrl: function() {
            return `https://books.google.com/books/content/images/frontcover/${this.imgId}?fife=w800-h1200`
        }
    },
    mounted: function() {
        this.axios(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.isbn}`)
            .then((getRes) => {
                this.title = getRes.data.items[0].volumeInfo.title
                this.authors = getRes.data.items[0].volumeInfo.authors
                this.imgId = getRes.data.items[0].id
            })
            .catch(() => {
                this.$emit('error', '書籍データ取得に失敗しました')
            })
    },
    methods: {
        link() {
            this.$router.push('/collection/' + this.uuid)
        }
    }
}
</script>