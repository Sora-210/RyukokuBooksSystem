<template>
    <table>
        <tr class="tableTitle">
            <th>レンタルID</th>
            <th>ステータス</th>
            <th>UUID</th>
            <th>貸出日</th>
            <th>返却日</th>
            <th></th>
        </tr>
        <tr class="tableItem" v-for="item in rentalsList" :key="item.index">
            <td>
                {{ item.id }}
            </td>
            <td v-if="item.returnDay === null">
                <span v-if="new Date(item.startDay) <= downDay2" style="color:red;">未返却[期限切れ]</span>
                <span v-else style="color:blue;">貸出中</span>
            </td>
            <td v-else>
                <span style="color:green;">返却済</span>
            </td>
            <td>
                <router-link :to="`/collection/` + item.uuid">
                    {{ item.uuid}}
                </router-link>
            </td>
            <td>
                {{ item.startDay }}
            </td>
            <td v-if="item.returnDay === null">
                -
            </td>
            <td v-else>
                {{ item.returnDay}}
            </td>
            <td>
                <v-btn size="small" color="primary" text @click="$emit('on-rental-detail-dialog', item.id)">
                    <v-icon>fas fa-info</v-icon>
                </v-btn>
            </td>
        </tr>
    </table>
</template>
<script>
export default {
    props: {
        rentalsList: {
            type: Array,
            default: () => ([])
        }
    },
    data: function() {
        return {
            downDay2: ''
        }
    },
    mounted: function() {
        this.downDay2 = (new Date()).addWeeks(-2);
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