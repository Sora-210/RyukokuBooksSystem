<template>
    <div>
        <v-card>
            <v-card-title>
                お知らせ設定
            </v-card-title>
            <v-card-text>
                <p>
                    トップページに表示されるのは1ページ目のみです
                </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="createNewsText" outlined label="お知らせ内容">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-btn @click="createNews" color="success">
                            登録
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
            <v-divider></v-divider>
            <newsTable :newsList=newsList @on-delete="deleteNews">
            </newsTable>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="text-right">
                    <v-pagination
                        v-model="newsPage"
                        :length="newsTotalPage"
                        next-icon="fas fa-caret-right"
                        prev-icon="fas fa-caret-left">
                    </v-pagination>
                </div>
            </v-card-actions>
        </v-card>
        <v-divider></v-divider>
    </div>
</template>
<script>
import newsTable from '../../components/admin/news/NewsTable'

export default {
    components: {
        newsTable
    },
    data: function() {
        return {
            createNewsText: "",
            newsPage: 1,
            newsTotalPage: 1,
            newsList:[]
        }
    },
    mounted: function() {
        this.getNews();
    },
    watch: {
        newsPage : function() {
            this.getNews()
        }
    },
    methods: {
        getNews() {
            this.newsList = []
            this.managerApi.get(`/news?page=${this.newsPage}`)
                .then((getRes) => {
                    this.newsTotalPage = Math.ceil(getRes.data.count / 4)
                    this.newsList = getRes.data.data
                })
                .catch((e) => {
                    if (e.response.status === 404) {
                        this.$emit('error', 'お知らせはありません')
                    } else {
                        this.$router.push('/500');
                    }
                })
        },
        createNews() {
            const options = {
                headers: {
                    token: this.$store.getters.token
                } 
            }
            if (this.createNewsText === "" || this.createNewsText === undefined) {
                this.$emit('error', '追加するお知らせを入力してください')
            } else {
                this.managerApi.post(`/news`, {content:this.createNewsText}, options)
                    .then(() => {
                        this.$emit('success', 'お知らせを追加しました')
                        this.getNews()
                    })
                    .catch(() => {
                        this.$emit('error', 'お知らせの追加に失敗しました')
                    })
            }
            this.createNewsText = ""
        },
        deleteNews(id) {
            if (window.confirm(`NewsId:${id}を削除してよろしいですか?`)) {
                const options = {
                    headers: {
                        token: this.$store.getters.token
                    }
                }
                this.managerApi.delete(`/news/${id}`, options)
                    .then(() => {
                        this.getNews()
                        this.$emit('success', '削除しました')
                    })
                    .catch(() => {
                        this.$router.push('/500')
                    })
            }
        }
    }
}
</script>