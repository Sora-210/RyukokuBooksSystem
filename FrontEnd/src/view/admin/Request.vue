<template>
    <div>
        <v-card>
            <v-card-title>
                リクエスト一覧
            </v-card-title>
            <div class="table mt-7 mx-1 sp-row-scroll">
                <table>
                    <tr class="tableTitle">
                        <th>
                            id
                        </th>
                        <th>
                            ジャンル
                        </th>
                        <th>
                            内容
                        </th>
                        <th>
                        </th>
                    </tr>
                    <tr class="tableItem" v-for="item in this.requestsList" :key="item.index">
                        <td>
                            {{ item.id }}
                        </td>
                        <td>
                            {{ requestGenre[item.genre] }}
                        </td>
                        <td>
                            {{ item.content}}
                        </td>
                        <td>
                            <v-btn
                                text
                                color="red"
                                @click="deleteRequest(item.id)"
                            >
                                <v-icon>far fa-trash-alt</v-icon>
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
    name:"Request",
    data: function() {
        return {
            requestsList:[],
            requestGenre:{
                1:'図書リクエスト',
                2:'その他',
            }
        }
    },
    mounted: function() {
        this.getRequests()
    },
    methods: {
        deleteRequest: function(id) {
            if (window.confirm('RequestId:' + id + 'を削除してよろしいですか?')) {
                const options = {
                    headers: {
                        token: this.$store.getters.token
                    }
                }
                this.axios.delete('http://localhost/requests/' + id, options)
                    .then((res) => {
                        console.log(res)
                        this.getRequests()
                        alert('削除しました')
                    })
                    .catch((err) => {
                        alert("エラーが発生しました:" + err)
                    })
            }
        },
        getRequests: function() {
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.axios.get('http://localhost/requests', options)
                .then((res) => {
                    console.log(res)
                    this.requestsList = res.data
                })
                .catch((err) => {
                    alert("エラーが発生しました:" + err)
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