<template>
    <div class="tableBox">
        <table>
            <tr class="tableTitle">
                <th>お知らせID</th>
                <th>内容</th>
                <th></th>
            </tr>
            <tr class="tableRow" v-for="newsItem in newsList" :key="newsItem.id">
                <!--お知らせID-->
                <td>{{ newsItem.id }}</td>
                <!--内容-->
                <td>{{ newsItem.content }}</td>
                <!--[削除アイコン]-->
                <td>
                    <v-btn @click="$emit('on-delete', newsItem.id)" size="small" color="red" text>
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
        newsList: {
            type: Array,
            default: () => ([])
        }
    },
}
</script>
<style>
@import url("../../../assets/css/table.css");
</style>