<template>
    <div>
        <v-card>
            <v-card-title>
                リクエスト一覧
            </v-card-title>
            <Table
                :columnNames=listNames
                :listItems=requestLists
                @Delete="deleteRequest"
            >
            </Table>
        </v-card>
    </div>
</template>
<script>
import Table from '../../components/Table.vue'

export default {
    name:"Request",
    components: {
        Table
    },
    data: function() {
        return {
            listNames:[
                {
                    title:"リクエストID",
                    variableName:"id"
                },
                {
                    title:"genre",
                    variableName:"genre"
                },
                {
                    title:"内容",
                    variableName:"content"
                },
                {
                    title:"削除",
                    variableName:"delete"
                }
            ],
            requestLists:[],
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
            this.requestLists = []
            const options = {
                headers: {
                    token: this.$store.getters.token
                }
            }
            this.axios.get('http://localhost/requests', options)
                .then((res) => {
                    console.log(res)
                    res.data.forEach(el => {
                        this.requestLists.push({
                            id:el.id,
                            genre:this.requestGenre[el.genre],
                            content:el.content,
                            delete:{
                                text:"削除",
                                emitName:"Delete",
                                emitVariable:el.id
                            }
                        })
                    });
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