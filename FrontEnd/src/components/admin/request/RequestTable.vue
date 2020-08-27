<template>
    <div class="tableBox">
        <table>
            <tr class="tableTitle">
                <th>リクエストID</th>
                <th>ジャンル</th>
                <th>内容</th>
                <th></th>
            </tr>
            <tr class="tableRow" v-for="requestItem in requestList" :key="requestItem.id">
                <!--リクエストID-->
                <td>{{ requestItem.id }}</td>
                <!--ジャンル-->
                <td>{{ requestGenre[requestItem.genre] }}</td>
                <!--内容-->
                <td>{{ requestItem.content }}</td>
                <!--[削除アイコン]-->
                <td>
                    <v-btn @click="$emit('on-delete', item.id)" size="small" color="red" text>
                        <v-icon>far fa-trash-alt</v-icon>
                    </v-btn>
                </td>
            </tr>
        </table>
    </div>
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
@import url("../../../assets/css/table.css");
</style>