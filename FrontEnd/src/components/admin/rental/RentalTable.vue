<template>
    <div class="tableBox">
        <table>
            <tr class="tableTitle">
                <th>レンタルID</th>
                <th>ステータス</th>
                <th>UUID</th>
                <th>貸出日</th>
                <th>返却日</th>
                <th></th>
            </tr>
            <tr class="tableRow" v-for="rentalItem in rentalList" :key="rentalItem.id">
                <!--レンタルID-->
                <td>{{ rentalItem.id }}</td>
                <!--ステータス-->
                <td v-if="rentalItem.returnDay === null">
                    <span v-if="new Date(rentalItem.startDay) <= date2WeeksAgo" style="color:red;">未返却[期限切れ]</span>
                    <span v-else style="color:blue;">貸出中</span>
                </td>
                <td v-else>
                    <span style="color:green;">返却済</span>
                </td>
                <!--UUID-->
                <td>
                    <router-link :to="`/collection/` + rentalItem.uuid">
                        {{ rentalItem.uuid}}
                    </router-link>
                </td>
                <!--貸出日-->
                <td>{{ rentalItem.startDay }}</td>
                <!--返却日-->
                <td v-if="rentalItem.returnDay === null">
                    -
                </td>
                <td v-else>
                    {{ rentalItem.returnDay}}
                </td>
                <!--[詳細アイコン]-->
                <td>
                    <v-btn @click="$emit('on-rental-detail-dialog', rentalItem.id)" size="small" color="primary" text>
                        <v-icon>fas fa-info</v-icon>
                    </v-btn>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        rentalList: {
            type: Array,
            default: () => ([])
        }
    },
    data: function() {
        return {
            date2WeeksAgo: ''
        }
    },
    mounted: function() {
        this.date2WeeksAgo = (new Date()).addWeeks(-2);
    }
}
</script>
<style>
@import url("../../../assets/css/table.css");
</style>