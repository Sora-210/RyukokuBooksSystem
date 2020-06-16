<template>
    <div>
        <v-card>
            <v-img
                :src="bookImgUrl"
            ></v-img>
            <v-card-title>
                {{ id }}
            </v-card-title>
            <v-card-text>
                {{ Title }}
            </v-card-text>
            <v-card-actions>
                <v-btn
                    @click="getApi"
                >
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
            "Title":""
        }
    },
    props:[
        'id'
    ],
    computed: {
        bookImgUrl: function() {
            return 'https://cover.openbd.jp/' + this.id + '.jpg'
        }
    },
    methods: {
        getApi() {
            console.log('access:' + 'https://api.openbd.jp/v1/get?isbn=' + this.id)
            this.axios.get('https://api.openbd.jp/v1/get?isbn=' + this.id)
                .then((res) => {
                    console.log(res.data)
                    this.Title = res.data[0].onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }
}
</script>