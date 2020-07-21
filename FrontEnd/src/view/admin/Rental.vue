<template>
    <div>
        <v-card>
            <v-card-title>
                貸出一覧
            </v-card-title>
            <div class="table mt-7 mx-1 sp-row-scroll">
                <table>
                    <tr class="tableTitle">
                        <th>レンタルID</th>
                        <th>ステータス</th>
                        <th>UUID</th>
                        <th>タイトル</th>
                        <th>貸出開始日</th>
                        <th>返却日</th>
                        <th></th>
                    </tr>
                    <tr class="tableItem" v-for="item in this.rentalsList" :key="item.index">
                        <td>{{ item.id }}</td>

                        <td v-if="item.return_day === null">
                            <span style="color:blue;">貸出中</span>
                        </td>
                        <td v-else>
                            <span style="color:green;">返却済み</span>
                        </td>

                        <td><router-link :to="`/collection/` + item.uuid">{{ item.uuid}}</router-link></td>
                        <td>タイトル</td>
                        <td>{{ item.start_day }}</td>

                        <td v-if="item.return_day === null">
                            -
                        </td>
                        <td v-else>
                            {{ item.return_day}}
                        </td>
                        
                        <td>
                            <v-btn size="small" color="success" text>
                                <v-icon>far fa-edit</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </table>
            </div>
        </v-card>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            rentalsList:[]
        }
    },
    mounted: function() {
        this.requestApi()
    },
    methods: {
        requestApi: function() {
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.axios.get('http://localhost/rentals', options)
                .then((res) => {
                    this.rentalsList = res.data
                })
                .catch((e) => {
                    alert("Error:"+e)
                })
        }
    }
}
</script>

<style scoped>
.sp-row-scroll {
    display: block;
    overflow-x: scroll;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}
table {
    border-collapse: collapse;
    width:100%;
}
th,
td {
    padding: 7px 20px 7px 20px;
}
.tableTitle {
    background-color:#e9e9e9;
    border-top: solid 1px#000000;
    border-bottom: solid 1px#000000;
}
.tableItem {
    text-align: left;
    border-bottom: solid 0.5px #e6e6e6;
}
.tableItem:hover {
    background-color:#f1f1f1;
}
</style>