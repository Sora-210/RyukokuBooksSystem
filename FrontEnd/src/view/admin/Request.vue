<template>
    <div>
        <div class="sp-row-scroll mt-7 mx-1">
            <table>
                <tr class="colName">
                    <th>
                        id
                    </th>
                    <th>
                        genre
                    </th>
                    <th>
                        内容
                    </th>
                    <th>
                    </th>
                </tr>
                <tr class="row-item" v-for="item in this.requestsList" :key="item.index">
                    <td>
                        {{ item.id }}
                    </td>
                    <td>
                        {{ item.genre }}
                    </td>
                    <td>
                        {{ item.content}}
                    </td>
                    <td>
                        <v-btn
                            dark
                            color="red"
                            @click="deleteRequest(item.id)"
                        >
                            削除する
                        </v-btn>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name:"Request",
    data: function() {
        return {
            requestsList:[]
        }
    },
    mounted: function() {
        this.axios.get('http://localhost/requests')
            .then((res) => {
                console.log(res)
                this.requestsList = res.data.data
            })
            .catch((err) => {
                console.log(err)
            })
    },
    methods: {
        deleteRequest: function(id) {
            if (window.confirm('RequestId:' + id + 'を削除してよろしいですか?')) {
                this.axios.delete('http://localhost/requests/' + id)
                    .then((res) => {
                        console.log(res)
                        this.reloadRequest()
                        alert('削除しました')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        reloadRequest: function() {
            this.axios.get('http://localhost/requests')
                .then((res) => {
                    console.log(res)
                    this.requestsList = res.data.data
                })
                .catch((err) => {
                    console.log(err)
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
th {
    padding: 10px 20px 10px 20px;
}
td {
    padding :10px 20px 10px 20px;
}
.colName {
    background-color:#d6d6d6;
    border-top: solid 1px#000000;
    border-bottom: solid 1px#000000;
}
.row-item {
    text-align: center;
}
</style>