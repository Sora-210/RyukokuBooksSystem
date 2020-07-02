<template>
    <div>
        <div class="sp-row-scroll mt-7 mx-1">
            <table>
                <tr class="colName">
                    <th>
                        レンタルID
                    </th>
                    <th>
                        ステータス
                    </th>
                    <th>
                        UUID
                    </th>
                    <th>
                        タイトル
                    </th>
                    <th>
                        貸出開始日
                    </th>
                    <th>
                        返却日
                    </th>
                </tr>
                <tr class="row-item" v-for="item in this.rentalsList" :key="item.index">
                    <td>
                        {{ item.id }}
                    </td>
                    <td v-if="item.return_day === null">
                        <span style="color:blue;">貸出中</span>
                    </td>
                    <td v-else>
                        <span style="color:green;">返却済み</span>
                    </td>
                    <td>
                        {{ item.uuid}}
                    </td>
                    <td>
                        タイトル
                    </td>
                    <td>
                        {{ item.start_day }}
                    </td>
                    <td v-if="item.return_day === null">
                        -
                    </td>
                    <td v-else>
                        {{ item.return_day}}
                    </td>
                </tr>
            </table>
        </div>
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
        this.axios.get('http://localhost/rentals')
            .then((res) => {
                console.log(res)
                this.rentalsList = res.data.data
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
</script>

<style scoped>
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