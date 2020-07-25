<template>
    <div pa-6 ma-4>
        <v-alert
            border="left"
            colored-border
            color="deep-purple accent-4"
            elevation="2"
        >
            データ取得元の影響により画質が悪いです
        </v-alert>
        <v-row>
            <v-col
                cols=12
                sm=3
            >
                <v-img
                    :src=this.BookData.imgUrl
                >
                </v-img>
            </v-col>
            <v-col
                cols=0
                sm=1
            >
            </v-col>
            <v-col
                cols=12
                sm=8
            >
                <h1>
                    {{ this.BookData.title }}
                </h1>
                <h2>
                    |
                    <span v-for="author in this.BookData.authors" :key="author.index">
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
                            <i v-if="rentalStatus" class="far fa-circle" style="color:green;"> (貸出可)</i>
                            <i v-else class="fas fa-times" style="color:red;"> (貸出中)</i>
                        </th>
                    </tr>
                </table>
                <br>
                <v-btn
                    v-if="rentalStatus"
                    large
                    color="success"
                    @click="rentalDialog.status = true"
                >
                    借りる
                </v-btn>
                <v-btn
                    v-if="!rentalStatus"
                    dark
                    large
                    color="red"
                    @click="returnDialog.status = true"
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
                    - CollectionInfo
                </p>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td>UUID</td>
                            <td>{{ this.CollectionData.uuid }}</td>
                        </tr>
                        <tr>
                            <td>NCD</td>
                            <td>{{ this.CollectionData.ncd }}</td>
                        </tr>
                        <tr>
                            <td>登録日</td>
                            <td>{{ this.CollectionData.registrationData }}</td>
                        </tr>
                        <tr>
                            <td>備考</td>
                            <td>{{ this.CollectionData.note }}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p style="font-size:20px;">
                    - BookInfo
                </p>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td>タイトル</td>
                            <td>{{ this.BookData.title }}</td>
                        </tr>
                        <tr>
                            <td>著作</td>
                            <td>
                                |
                                <span v-for="author in this.BookData.authors" :key="author.index">
                                    {{ author }} |
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>ISBN</td>
                            <td>{{ this.CollectionData.isbn }}</td>
                        </tr>
                        <tr>
                            <td>出版社</td>
                            <td>{{ this.CollectionData.publisher }}</td>
                        </tr>
                        <tr>
                            <td>発売日時</td>
                            <td>{{ this.CollectionData.publishedDate }}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-dialog v-model="rentalDialog.status" width="70%" persistent>
            <v-stepper v-model="rentalDialog.turn">
                <v-stepper-header>
                    <v-stepper-step step="1" :complete="rentalDialog.turn >= 2" complete-icon="fas fa-check-circle">情報の入力</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2" :complete="rentalDialog.turn >= 3" complete-icon="fas fa-check-circle"></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3" :complete="rentalDialog.turn >= 4" complete-icon="fas fa-check-circle">完了</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <div
                            class="pt-2 mb-4"
                        >
                            <v-select
                                :items="selectLists.schoolGradeList"
                                append-icon="fas fa-caret-down"
                                label="学年"
                                outlined
                                v-model="formData.grade"
                            ></v-select>
                            <v-select
                                :items="selectLists.ClassList"
                                append-icon="fas fa-caret-down"
                                label="クラス"
                                outlined
                                v-model="formData.class"
                            ></v-select>
                            <v-text-field
                                v-model="formData.number"
                                label="番号"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                v-model="formData.name"
                                label="名前"
                                outlined
                            ></v-text-field>
                        </div>
                        <v-btn
                            color="success"
                            @click="rentalRequest"
                        >
                            送信
                        </v-btn>
                        <v-btn text color="red" @click="rentalReset">
                            キャンセル
                        </v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <div
                            class="mb-12"
                            height="200px"
                        >
                            <v-img style="width:50px;margin:auto;" src="https://icons8.com/vue-static/landings/animated-icons/icons/book/book.gif"></v-img>
                            <p style="text-align:center;">貸出登録中... 少しお待ちください</p>
                        </div>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-alert
                            icon="far fa-thumbs-up"
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                        >
                            貸出登録完了しました!<br>
                            返却期限は[{{ rentalDialog.returnDate }}]です。
                        </v-alert>
                        <v-btn
                            color="red"
                            dark
                            @click="rentalReset"
                        >
                            閉じる
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
        <v-dialog v-model="returnDialog.status" width="70%" persistent>
            <v-stepper v-model="returnDialog.turn">
                <v-stepper-header>
                    <v-stepper-step step="1" :complete="returnDialog.turn >= 2" complete-icon="fas fa-check-circle">情報の入力</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="2" :complete="returnDialog.turn >= 3" complete-icon="fas fa-check-circle"></v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3" :complete="returnDialog.turn >= 4" complete-icon="fas fa-check-circle">完了</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <div
                            class="pt-2 mb-4"
                        >
                        </div>
                        <v-btn
                            color="success"
                            @click="returnRequest"
                        >
                            返却する
                        </v-btn>
                        <v-btn text color="red" @click="returnReset">
                            キャンセル
                        </v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <div
                            class="mb-12"
                            height="200px"
                        >
                            <v-img style="width:50px;margin:auto;" src="https://icons8.com/vue-static/landings/animated-icons/icons/book/book.gif"></v-img>
                            <p style="text-align:center;">返却中... 少しお待ちください</p>
                        </div>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-alert
                            icon="far fa-thumbs-up"
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                        >
                            返却完了しました<br>
                        </v-alert>
                        <v-btn
                            color="red"
                            dark
                            @click="returnReset"
                        >
                            閉じる
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
        <v-overlay :value="isLoading">
            <img src="https://icons8.com/vue-static/landings/animated-icons/icons/book/book.gif">
        </v-overlay>
    </div>
</template>

<script>
require('date-utils')
const DateNow = new Date();

export default {
    data: function() {
        return {
            isLoading:true,
            url:'http://localhost/',
            resStatus:false,
            rentalStatus:false,
            rentalDialog: {
                status:false,
                turn:1,
                returnDate:""
            },
            returnDialog: {
                status:false,
                turn:1
            },
            BookData:{
                title:"",
                authors:"",
                imgUrl:"",
                publisher:"",
                publishedDate:"",
            },
            CollectionData: {
                uuid:"",
                isbn:"",
                note:"",
                registrationData:"",
                ncd:""
            },
            formData: {
                grade:0,
                class:"",
                number:"",
                name:""
            },
            selectLists: {
                schoolGradeList:[
                    {text:"中等部 1年",value:11},
                    {text:"中等部 2年",value:12},
                    {text:"中等部 3年",value:13},
                    {text:"高等部 1年",value:21},
                    {text:"高等部 2年",value:22},
                    {text:"高等部 3年",value:23},
                ],
                ClassList:[
                    {text:"A",value:1},
                    {text:"B",value:2},
                    {text:"C",value:3},
                    {text:"D",value:4},
                    {text:"E",value:5},
                    {text:"F",value:6},
                    {text:"G",value:7},
                    {text:"Z・V・S",value:8},
                ]
            }
        }
    },
    mounted: async function() {
        await this.getBookData()
    },
    methods: {
        getBookData: async function() {
            try {
                this.BookData.uuid = this.$route.params.uuid
                const apiRes = await this.axios.get(this.$store.getters.apiEndpoint + '/collections/' + this.BookData.uuid)
                console.log(apiRes)
                this.BookData = apiRes.data.BookData
                this.CollectionData = apiRes.data.CollectionData
                this.rentalStatus = apiRes.data.CollectionData.rentalStatus
                this.isLoading = false
            } catch(e) {
                switch(e.response.status) {
                    case 404:
                        this.$router.push('/404')
                        break;
                    case 500:
                        this.$emit("Error",e)
                        this.$router.push('/500')
                        break;
                    default:
                        this.$emit("Error",e)
                        break;
                }
            }
        },
        rentalRequest: function() {
            console.log('rentalRequest')
            this.rentalDialog.turn = 2
            let sendObject = this.formData
            console.log(sendObject)
            this.axios.patch(this.$store.getters.apiEndpoint + '/collections/' + this.$route.params.uuid + '/rental',sendObject)
                .then((response) => {
                    console.log(response)
                    this.getBookData()
                    this.rentalDialog.returnDate = DateNow.addWeeks(2).toFormat('YYYY年MM月DD日')
                    setTimeout(()=>{
                        this.rentalDialog.turn = 3
                    },2500)
                })
                .catch((err) => {
                    alert('Error:'+err)
                    this.rentalReset()
                })
            
        },
        rentalReset: function() {
            this.rentalDialog = {status:false,turn:1,returnDate:""}
            this.formData = {grade:0,class:"",number:"",name:""}
        },
        returnRequest: function() {
            console.log('returnRequest')
            this.returnDialog.turn = 2
            this.axios.patch(this.$store.getters.apiEndpoint + '/collections/' + this.$route.params.uuid + '/return')
                .then((res) => {
                    this.getBookData()
                    console.log(res)
                    setTimeout(()=>{
                        this.returnDialog.turn = 3
                    },2500)
                })
                .catch((err) => {
                    alert("Error:" + err)
                    this.returnReset()
                })
        },
        returnReset: function() {
            this.returnDialog = {status:false,turn:1}
        },
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