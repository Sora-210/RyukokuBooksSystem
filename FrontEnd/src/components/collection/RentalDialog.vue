<template>
    <v-dialog v-model="isDialog" width="70%" persistent>
        <v-stepper v-model="page">
            <v-stepper-header>
                <v-stepper-step step="1" :complete="page >= 2" complete-icon="fas fa-check-circle">情報の入力</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="page >= 3" complete-icon="fas fa-check-circle"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" :complete="page >= 4" complete-icon="fas fa-check-circle">完了</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form ref="form" v-model="isValid" class="pt-2 mb-4">
                        <v-select
                            label="学年"
                            v-model="formData.grade"
                            :items="selectLists.schoolGradeList"
                            :rules="[v => !!v || '学年を選択してください']"
                            append-icon="fas fa-caret-down"
                            outlined>
                        </v-select>
                        <v-select
                            label="クラス"
                            v-model="formData.class"
                            :items="selectLists.classList"
                            :rules="[v => !!v || 'クラスを選択してください']"
                            append-icon="fas fa-caret-down"
                            outlined>
                        </v-select>
                        <v-text-field
                            label="番号"
                            v-model="formData.number"
                            :rules="[ v => /\d/.test(v) || '番号は数字を入力してください' , v => !!v || '番号を入力してください']"
                            outlined>
                        </v-text-field>
                        <v-text-field
                            label="名前"
                            v-model="formData.name"
                            :rules="[v => !!v || '名前を入力してください']"
                            outlined>
                        </v-text-field>
                    </v-form>
                    <v-btn color="success" @click="requestRental">
                        送信
                    </v-btn>
                    <v-btn text color="red" @click="resetRental">
                        キャンセル
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <div class="mb-12" height="200px">
                        <v-img style="width:50px;margin:auto;" src="../../assets/book.gif"></v-img>
                        <p style="text-align:center;">
                            貸出登録中...
                        </p>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-alert
                        icon="far fa-thumbs-up"
                        border="left"
                        colored-border
                        type="info"
                        elevation="2">
                        貸出登録完了しました!<br>
                        返却期限は[{{ returnDate }}]です。
                    </v-alert>
                    <v-btn color="red" dark @click="resetRental">
                        閉じる
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-dialog>
</template>
<script>
require('date-utils')
const DateNow = new Date();
export default {
    props: {
        uuid: {
            type: String,
            default: ''
        },
        isDialog: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            page: 1,
            returnDate: '',
            formData: {
                grade:0,
                class:"",
                number:"",
                name:""
            },
            isValid: false,
            selectLists: {
                schoolGradeList:[
                    {text:"中等部 1年",value:11},
                    {text:"中等部 2年",value:12},
                    {text:"中等部 3年",value:13},
                    {text:"高等部 1年",value:21},
                    {text:"高等部 2年",value:22},
                    {text:"高等部 3年",value:23},
                ],
                classList:[
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
    methods: {
        requestRental() {
            this.$refs.form.validate()
            if (this.isValid) {
                this.page = 2
                this.managerApi.patch(`/collections/${this.uuid}/rental`, this.formData)
                    .then(() => {
                        this.$emit('reload')
                        this.returnDate = DateNow.addWeeks(2).toFormat('YYYY年MM月DD日')
                        setTimeout(()=>{
                            this.page = 3
                        },2500)
                    })
                    .catch((e) => {
                        this.resetRental()
                        if (e.response.status === 409) {
                            this.$emit('error', '既に借りられています')
                        } else {
                            this.$router.push('/500')
                        }
                    })
            }
        },
        resetRental() {
            Object.assign(this.$data, this.$options.data())
            this.$emit('close')
        },
    }
}
</script>