<template>
    <table>
        <tr class="tableTitle">
            <th>リクエストID</th>
            <th>ジャンル</th>
            <th>内容</th>
            <th></th>
        </tr>
        <tr class="tableItem" v-for="item in requestList" :key="item.index">
            <td>
                {{ item.id }}
            </td>
            <td>
                {{ requestGenre[item.genre] }}
            </td>
            <td>
                {{ item.content }}
            </td>
            <td>
                <v-btn size="small" color="red" text @click="$emit('on-delete', item.id)">
                    <v-icon>far fa-trash-alt</v-icon>
                </v-btn>
            </td>
        </tr>
    </table>
</template>
<script>
export default {
    props: {
        requestList: {
            type: Array,
            default: () => ([])
        }
    },
    data: function() {
        return {
            requestGenre:{
                1:'図書リクエスト',
                2:'その他',
            }
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
th, td {
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