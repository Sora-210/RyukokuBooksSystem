<template>
    <div>
        <v-row>
            <v-col cols=12 sm=6>
                <v-card>
                    <v-card-title>
                        貸出冊数
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-container>
                        <line-chart :chart-data="rentalDatas"></line-chart>
                    </v-container>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <button color="warning" @click="fillData()">詳細</button>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols=12 sm=6>
                <v-card>
                    <v-card-title>
                        返却冊数
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-container>
                        <line-chart :chart-data="returnDatas"></line-chart>
                    </v-container>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <button color="warning" @click="fillData()">詳細</button>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>


<script>
import LineChart from '../../assets/js/Chart/Line.js'

export default {
    components: {
        LineChart
    },
    data () {
        return {
            rentalDatas: null,
            returnDatas: null
        }
    },
    mounted () {
        this.getRentalDatas()
        this.getReturnDatas()
    },
    methods: {
        getRentalDatas () {
            this.rentalDatas = {
                labels: ["月","火","水","木","金"],
                datasets: [
                    {
                        label: '貸出冊数',
                        borderColor: '#f87979',
                        data: [1,2,3,4,5]
                    }
                ]
            }
        },
        getReturnDatas () {
            this.returnDatas = {
                labels: ["月","火","水","木","金"],
                datasets: [
                    {
                        label: '返却冊数',
                        borderColor: '#32FF00',
                        data: [1,2,3,4,5]
                    }
                ]
            }
        }
    }
}
</script>