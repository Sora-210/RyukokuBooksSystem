<template>
    <div pa-6 ma-4>
        <div v-if="this.resStatus">
            <v-row>
                <v-col
                    cols=12
                    sm=3
                >
                    <v-img
                        :src=this.data.img
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
                        {{ this.data.title }}
                    </h1>
                    <h2>
                        |
                        <span v-for="author in this.data.authors" :key="author.index">
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
                                <i v-if="!rentalStatus" class="fas fa-times" style="color:red;"> (貸出中)</i>
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
                                <td>{{ this.data.uuid }}</td>
                            </tr>
                            <tr>
                                <td>NCD</td>
                                <td>{{ this.data.ncd }}</td>
                            </tr>
                            <tr>
                                <td>登録日</td>
                                <td>{{ this.data.registrationData }}</td>
                            </tr>
                            <tr>
                                <td>備考</td>
                                <td>{{ this.data.note }}</td>
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
                                <td>{{ this.data.title }}</td>
                            </tr>
                            <tr>
                                <td>著作</td>
                                <td>
                                    |
                                    <span v-for="author in this.data.authors" :key="author.index">
                                        {{ author }} |
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>ISBN</td>
                                <td>{{ this.data.isbn }}</td>
                            </tr>
                            <tr>
                                <td>出版社</td>
                                <td>{{ this.data.publisher }}</td>
                            </tr>
                            <tr>
                                <td>発売日時</td>
                                <td>{{ this.data.publishedDate }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <h2> 404 NotFount </h2>
        </div>
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
                            <!-- <v-alert
                                v-if="this.registerDialogMessage !== ''"
                                icon="fas fa-exclamation-triangle"
                                dense
                                outlined
                                type="error"
                            >
                                {{ registerDialogMessage }}
                            </v-alert> -->
                            <v-select
                                :items="schoolGradeLists"
                                append-icon="fas fa-caret-down"
                                label="学年"
                                outlined
                                v-model="formData.grade"
                            ></v-select>
                            <v-text-field
                                v-model="formData.class"
                                label="クラス"
                                outlined
                            ></v-text-field>
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
                            <!-- <v-alert
                                v-if="this.registerDialogMessage !== ''"
                                icon="fas fa-exclamation-triangle"
                                dense
                                outlined
                                type="error"
                            >
                                {{ registerDialogMessage }}
                            </v-alert> -->
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
    </div>
</template>

<script>
export default {
    data: function() {
        return {
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
            data:{
                uuid:"",
                title:"",
                authors:"",
                isbn:"",
                img:"",
                publisher:"",
                publishedDate:"",
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
            schoolGradeLists:[
                {text:"中等部 1年",value:11},
                {text:"中等部 2年",value:12},
                {text:"中等部 3年",value:13},
                {text:"高等部 1年",value:21},
                {text:"高等部 2年",value:22},
                {text:"高等部 3年",value:23},
            ]
        }
    },
    mounted: function() {
        this.data.uuid = this.$route.params.uuid
        this.axios('http://localhost/collection/' + this.data.uuid)
            .then((res) => {
                console.log(res.data.data[0])
                this.data.note = res.data.data[0].note
                this.data.registrationData = res.data.data[0].registrationData
                this.data.ncd = res.data.data[0].ncd
                this.data.isbn = res.data.data[0].isbn
                this.rentalStatus = res.data.data[0].rentalStatus
                this.axios('https://www.googleapis.com/books/v1/volumes?q=isbn:' + this.data.isbn)
                    .then((res) => {
                        this.resStatus = true
                        const ResData = res.data.items[0]
                        this.data.title = ResData.volumeInfo.title
                        this.data.authors = ResData.volumeInfo.authors
                        this.data.img = "https://books.google.com/books/content/images/frontcover/" + ResData.id + "?fife=w800-h1200"
                        this.data.publisher = ResData.volumeInfo.publisher
                        this.data.publishedDate = ResData.volumeInfo.publishedDate
                        console.log(this.data)
                    })
                    .catch((err) => {
                        this.resStatus = false
                        alert('Bookデータの取得中にエラーが発生しました')
                        console.log(err)
                    })
            })
            .catch((err) => {
                this.resStatus = false
                alert('Bookデータの取得中にエラーが発生しました')
                console.log(err)
            })
    },
    methods: {
        rentalRequest: function() {
            console.log('rentalRequest')
            this.rentalDialog.turn = 2
            let sendObject = this.formData
            this.axios.patch('http://localhost/collections/' + this.$route.params.uuid + '/rental',sendObject)
                .then((response) => {
                    console.log(response)
                    this.reloadCollectionData()
                    this.rentalDialog.returnDate = "2020/00/00"
                    setTimeout(()=>{
                        this.rentalDialog.turn = 3
                    },2500)
                })
                .catch((err) => {
                    console.log(err)
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
            this.axios.patch('http://localhost/collections/' + this.$route.params.uuid + '/return')
                .then((res) => {
                    this.reloadCollectionData()
                    console.log(res)
                    setTimeout(()=>{
                        this.returnDialog.turn = 3
                    },2500)
                })
                .catch((err) => {
                    console.log(err)
                    this.returnReset()
                })
        },
        returnReset: function() {
            this.returnDialog = {status:false,turn:1}
        },
        reloadCollectionData: function() {
            this.data.uuid = this.$route.params.uuid
            this.axios('http://localhost/collection/' + this.data.uuid)
                .then((res) => {
                    console.log(res.data.data[0])
                    this.data.note = res.data.data[0].note
                    this.data.registrationData = res.data.data[0].registrationData
                    this.data.ncd = res.data.data[0].ncd
                    this.data.isbn = res.data.data[0].isbn
                    this.rentalStatus = res.data.data[0].rentalStatus
                    this.axios('https://www.googleapis.com/books/v1/volumes?q=isbn:' + this.data.isbn)
                        .then((res) => {
                            this.resStatus = true
                            const ResData = res.data.items[0]
                            this.data.title = ResData.volumeInfo.title
                            this.data.authors = ResData.volumeInfo.authors
                            this.data.img = "https://books.google.com/books/content/images/frontcover/" + ResData.id + "?fife=w800-h1200"
                            this.data.publisher = ResData.volumeInfo.publisher
                            this.data.publishedDate = ResData.volumeInfo.publishedDate
                            console.log(this.data)
                        })
                        .catch((err) => {
                            this.resStatus = false
                            alert('Bookデータの取得中にエラーが発生しました')
                            console.log(err)
                        })
            })
            .catch((err) => {
                this.resStatus = false
                alert('Bookデータの取得中にエラーが発生しました')
                console.log(err)
            })
        }
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