<template>
    <div>
        <v-btn
            color="success"
        >
            蔵書登録
        </v-btn>
        <div class="sp-row-scroll">
            <table>
                <tr class="colName">
                    <th>
                        UUID
                    </th>
                    <th>
                        ISBN
                    </th>
                    <th>
                        タイトル
                    </th>
                    <th>
                        NCD
                    </th>
                    <th>
                        登録日
                    </th>
                    <th>
                        備考
                    </th>
                </tr>
                <tr class="row-item">
                    <td>
                        9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
                    </td>
                    <td>
                        9999999999999
                    </td>
                    <td>
                        トニカクカワイイ
                    </td>
                    <td>
                        999
                    </td>
                    <td>
                        0000/00/00
                    </td>
                    <td>
                        寄贈
                    </td>
                </tr>
                <tr class="row-item">
                    <td>
                        9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
                    </td>
                    <td>
                        9999999999999
                    </td>
                    <td>
                        トニカクカワイイ
                    </td>
                    <td>
                        999
                    </td>
                    <td>
                        0000/00/00
                    </td>
                    <td>
                        寄贈
                    </td>
                </tr>
                <tr class="row-item">
                    <td>
                        9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
                    </td>
                    <td>
                        9999999999999
                    </td>
                    <td>
                        トニカクカワイイ
                    </td>
                    <td>
                        999
                    </td>
                    <td>
                        0000/00/00
                    </td>
                    <td>
                        寄贈
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    
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