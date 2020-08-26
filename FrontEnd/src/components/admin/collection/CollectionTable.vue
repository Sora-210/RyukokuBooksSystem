<template>
    <table>
        <tr class="tableTitle">
            <th>UUID</th>
            <th>ISBN</th>
            <th>NDC</th>
            <th>登録日</th>
            <th>備考</th>
            <th></th>
        </tr>
        <tr class="tableItem" v-for="item in collectionList" :key="item.index">
            <td>
                <router-link :to="`/collection/` + item.uuid">
                    {{ item.uuid}}
                </router-link>
            </td>
            <td>
                {{ item.isbn }}
            </td>
            <td>
                {{ item.ndc }}
            </td>
            <td>
                {{ item.registrationDate }}
            </td>
            <td>
                {{ item.note }}
            </td>
            <td>
                <v-btn size="small" color="primary" text @click="$emit('on-edit', item.uuid)">
                    <v-icon>fas fa-edit</v-icon>
                </v-btn>
            </td>
        </tr>
    </table>
</template>
<script>
export default {
    props: {
        collectionList: {
            type: Array,
            default: () => ([])
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