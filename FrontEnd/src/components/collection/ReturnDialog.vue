<template>
    <v-dialog v-model="isDialog" width="70%" persistent>
        <v-stepper v-model="stepperPage">
            <v-stepper-header>
                <v-stepper-step step="1" :complete="stepperPage >= 2" complete-icon="fas fa-check-circle">情報の入力</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="stepperPage >= 3" complete-icon="fas fa-check-circle"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" :complete="stepperPage >= 4" complete-icon="fas fa-check-circle">完了</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <div class="pt-2 mb-4"></div>
                    <v-btn color="success" @click="requestReturn">
                        返却する
                    </v-btn>
                    <v-btn text color="red" @click="resetReturn">
                        キャンセル
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <div class="mb-12" height="200px">
                        <v-img style="width:50px;margin:auto;" src="../../assets/book.gif"></v-img>
                        <p style="text-align:center;">
                            返却中...
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
                        返却完了しました
                    <br>
                    </v-alert>
                    <v-btn color="red" dark @click="resetReturn">
                        閉じる
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-dialog>
</template>
<script>
export default {
    props: {
        isDialog: {
            type: Boolean,
            default: false
        },
        uuid: {
            type: String,
            default: ''
        }
    },
    data: function() {
        return {
            stepperPage: 1
        }
    },
    methods: {
        requestReturn() {
            this.stepperPage = 2
            this.managerApi.patch(`/collections/${this.$route.params.uuid}/return`)
                .then(() => {
                    this.$emit('reload')
                    setTimeout(()=>{
                        this.stepperPage = 3
                    },2500)
                })
                .catch((e) => {
                    this.resetReturn()
                    if (e.response.status === 409) {
                        this.$emit('error', '借りられていないため返却できません')
                    } else {
                        this.$router.push('/500')
                    }
                })
        },
        resetReturn() {
            Object.assign(this.$data, this.$options.data())
            this.$emit('close')
        },
    }
}
</script>