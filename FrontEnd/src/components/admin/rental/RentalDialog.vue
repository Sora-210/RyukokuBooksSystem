<template>
    <v-dialog v-model="isDialog" width="70%" @click:outside="close">
        <v-card>
            <v-card-title>
                貸出情報
            </v-card-title>
            <v-divider></v-divider>
            <div v-if="!isLoading">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="レンタルID"
                                    v-model="rentalData.id"
                                    disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="UUID"
                                    v-model="rentalData.uuid"
                                    disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="借りた人"
                                    v-model="rentalUser"
                                    disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="貸出日"
                                    v-model="rentalData.startDay"
                                    disabled>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="返却日"
                                    v-model="rentalData.returnDay"
                                    disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions  class="d-flex justify-end">
                    <v-btn color="warning" @click="close">閉じる</v-btn>
                </v-card-actions>
            </div>
            <div v-else>
                <v-img style="width:70px;margin:20px auto;padding:20px" src="../../../assets/book.gif"></v-img>
                <p style="text-align:center;margin:0;padding:10px">Now Loading</p>
            </div>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props:{
        isRentalDetailDialog: {
            type: Boolean,
            default: false
        },
        rentalId: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {
            isLoading:false,
            isDialog:false,
            rentalData:{},
            selectList: {
                schoolGradeList:{
                    11:"中等部 1年",
                    12:"中等部 2年",
                    13:"中等部 3年",
                    21:"高等部 1年",
                    22:"高等部 2年",
                    23:"高等部 3年",
                },
                ClassList:{
                    1:"A",
                    2:"B",
                    3:"C",
                    4:"D",
                    5:"E",
                    6:"F",
                    7:"G",
                    8:"Z・V・S",
                }
            }
        }
    },
    computed: {
        rentalUser: function() {
            return `(${this.rentalData.year}年) [${this.selectList.schoolGradeList[this.rentalData.grade]}/${this.selectList.ClassList[this.rentalData.class]}組/${this.rentalData.number}番] - ${this.rentalData.name}`
        }
    },
    watch: {
        isRentalDetailDialog: function() {
            if (this.isRentalDetailDialog) {
                this.isDialog = this.isRentalDetailDialog
                this.getRentalDetail(this.rentalId)
            } else {
                this.isDialog = false
            }
        }
    },
    methods: {
        getRentalDetail(rentalId) {
            this.isLoading = true
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.managerApi.get(`/rentals/${rentalId}`, options)
                .then((getRes) => {
                    this.rentalData = getRes.data.data[0]
                    this.isLoading = false
                })
                .catch(() => {
                    this.$router.push('/500')
                })
        },
        close: function() {
            this.$emit('close')
        }
    }
}
</script>