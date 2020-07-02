<template>
    <div>
        <v-parallax
            dark
            src="https://beiz.jp/images_M/japanese-style/japanese-style_00005.jpg">
            <v-row
                align="center"
                justify="center">
                <v-col
                    class="text-center"
                    cols="12">
                        <h1 class="display-1 font-weight-thin mb-4"><div id="title">RyukokuBooksSystem</div></h1>
                </v-col>
            </v-row>
        </v-parallax>
        <v-row>
            <v-col
                cols="6"
            >
                <div
                    style="height:500px;background-color:red;"
                >
                </div>
            </v-col>
            <v-col
                cols="6"
            >
                <div
                    style="height:500px;background-color:blue;"
                >
                </div>
            </v-col>
        </v-row>
        <h2>新刊</h2>
        <v-row>
            <v-col
                cols="6"
                lg="2"
                sm="4"
                v-for="id in newBooksList" :key="id.index"
            >
                <BookCard
                    :id="id"
                    style="margin:10px;"
                >
                </BookCard>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import BookCard from '../components/BooksCard.vue'

export default {
    name: "Home",
    components: {
        BookCard
    },
    data: function() {
        return {
            newBooksList:[
                "9784844336389",
                "9784844336778",
                "9784844333937",
                "9784798155302",
                "9784535788770"
            ]
        }
    }
}
</script>

<style scoped>
@media screen and (max-width: 430px){
    #title {
        font-size: 23px;
    }
}
#title {
    padding: 10px 20px;
    backdrop-filter: blur(5px);
    display: inline-block;
}
</style>