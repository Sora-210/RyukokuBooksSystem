<template>
    <v-dialog v-model="isDialog" width="70%" @click:outside="Close">
        <v-card>
            <v-card-title>
                貸出情報
            </v-card-title>
            <v-divider></v-divider>
            <div v-if="getStatus">
                <v-card-text>
                    <h3>レンタルID</h3>
                    <p>{{ this.RentalData.id }}</p>
                    <h3>UUID</h3>
                    <p>{{ this.RentalData.uuid }}</p>
                    <h3>年</h3>
                    <p>{{ this.RentalData.year }}</p>
                    <h3>借りた人</h3>
                    <p>{{ this.selectLists.schoolGradeList[this.RentalData.grade] }}/{{ this.selectLists.ClassList[this.RentalData.class]}}組/{{ this.RentalData.number}}番</p>
                    <p>{{ this.RentalData.name }}</p>
                    <h3>貸出日</h3>
                    <p>{{ this.RentalData.start_day }}</p>
                    <h3>返却日</h3>
                    <p>{{ this.RentalData.return_day }}</p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions  class="d-flex justify-end">
                    <v-btn color="warning" @click="Close">閉じる</v-btn>
                </v-card-actions>
            </div>
            <div v-else>
                <v-img style="width:70px;margin:20px auto;padding:20px" src="../../assets/book.gif"></v-img>
                <p style="text-align:center;margin:0;padding:10px">Now Loading</p>
            </div>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "RentalDialog",
    props:[
        'isRentalDetailDialog',
        'selectLists',
        'rentalId'
    ],
    data: function() {
        return {
            getStatus:false,
            isDialog:false,
            RentalData:{}
        }
    },
    methods: {
        getRentalDetail: async function(rentalId) {
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            try {
                const Res = await this.axios.get(this.$store.getters.apiEndpoint + "/rentals/" + rentalId, options)
                this.RentalData = Res.data
                this.getStatus = true
            } catch(e) {
                this.$emit('Error', e)
            }
        },
        Close: function() {
            this.$emit('close')
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
    }
}
</script>