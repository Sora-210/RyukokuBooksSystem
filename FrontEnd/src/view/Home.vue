<template>
    <div>
        <v-parallax
            dark
            src="../assets/topImage.jpg">
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
        <v-row
            id="brackBoard">
            <v-col
                sm="6"
                cols="12"
            >
                <div class="brackBoard_notice">
                    <h4>お知らせ</h4>
                    <div class="brackBoard_list">
                        <ul>
                            <!-- <li v-for="news in newsList" :key="news.index"><a>{{news.content}}</a></li> -->
                            <li><a>夏休みは5冊借りられます!</a></li>
                            <li><a>8月の新刊が追加されました</a></li>
                            <li><a>今週一週間は読書期間です！</a></li>
                        </ul>
                    </div>
                </div>
            </v-col>
            <v-col
                sm="6"
                cols="12"
            >
                <div class="brackBoard_day">
                    <h4 class="today">本日</h4>
                    <span>{{ today }}</span>
                    <h4 class="return_day">返却日</h4>
                    <span>{{ returnDay }}</span>
                </div>
            </v-col>
        </v-row>
        <h2>新刊</h2>
        <v-row>
            <v-col
                cols="12"
                sm="3"
                v-for="newBook in newBooksList" :key="newBook.index"
            >
                <BookCard
                    :isbn="newBook.isbn"
                    :uuid="newBook.uuid"
                    style="margin:10px;"
                >
                </BookCard>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import BookCard from '../components/BooksCard.vue'
require('date-utils')
const today = new Date();
const returnDay = (new Date()).addWeeks(2);

export default {
    name: "Home",
    components: {
        BookCard
    },
    data: function() {
        return {
            today: today.toFormat('YYYY年MM月DD日'),
            returnDay: returnDay.toFormat('YYYY年MM月DD日'),
            newBooksList:[],
            newsList:[]
        }
    },
    mounted: function() {
        this.getNewsRequest()
        this.getNewCollectionRequest()
    },
    methods: {
        async getNewsRequest() {
            try {
                const Res = await this.axios.get(`/news?limit=4`)
                this.newsList = Res.data.News
            } catch(e) {
                this.$emit('Error',e)
            }
        },
        async getNewCollectionRequest() {
            try {
                // const query = "?sortRow=registrationDate&sortDirection=DESC"
                const Res = await this.axios.get(`/collections`)
                console.log(Res)
                for (let i = 0;i<4;i++) {
                    this.newBooksList.push({
                        isbn: Res.data.data[i].isbn,
                        uuid: Res.data.data[i].uuid
                    })
                }
                console.log(this.newBooksList)
            } catch(e) {
                this.$emit('Error',e)
            }
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
    color:black;
    padding: 10px 20px;
    backdrop-filter: blur(5px);
    display: inline-block;
}


#brackBoard {
    height:400px;
    padding: 50px 0 0 70px ;
    background-image: url(../assets/black.png);
    background-size:100% 100%;
}

.brackBoard_notice h4{
    font-size: 30px;
    color:rgba(255, 255, 255, 0.87);
}
.brackBoard_list{
    padding-top: 10px;
    padding-left: 5px;
    color:rgba(255, 255, 255, 0.87);
    font-size: 20px;
}
.brackBoard_list li{
    margin-bottom: 5px;
}
.brackBoard_list li a{
    color:rgba(255, 255, 255, 0.87);
}
.brackBoard_list li:hover{
    margin-bottom: 4px;
    border-bottom:solid 1px deeppink;
}

.brackBoard_day h4{
    color:rgba(255, 255, 255, 0.87);
    font-size: 30px;
}
.brackBoard_day .return_day {
    padding-top: 20px;
}
.brackBoard_day span {
    padding-left: 40px;
    color:rgba(255, 255, 255, 0.87);
    font-size: 20px;
}


@media screen and (max-width: 600px){
    #brackBoard {
        height:700px;
        padding: 70px 0 0 50px ;
    }
}
@media screen and (max-width: 400px){
    #brackBoard {
        padding: 70px 0 0 30px ;
    }
    .brackBoard_notice h4{
        font-size: 25px;
        color:rgba(255, 255, 255, 0.87);
    }
    .brackBoard_list{
        font-size: 15px;
    }
    .brackBoard_day h4{
        font-size: 25px;
    }
    .brackBoard_day span {
        font-size: 15px;
    }
}
</style>