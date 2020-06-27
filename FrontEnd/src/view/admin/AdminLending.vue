<template>
    <div>
        <table>
            <tr class="colName">
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
                    返却予定日
                </th>
            </tr>
            <tr class="row-item">
                <td>
                    〇
                </td>
                <td>
                    9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
                </td>
                <td>
                    貸出中のタイトル
                </td>
                <td>
                    0000/00/00
                </td>
                <td>
                    0000/00/00
                </td>
            </tr>
            <tr class="row-item">
                <td>
                    延滞
                </td>
                <td>
                    9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
                </td>
                <td>
                    貸出中のタイトル
                </td>
                <td>
                    0000/00/00
                </td>
                <td>
                    0000/00/00
                </td>
            </tr>
            <tr class="row-item">
                <td>
                    〇
                </td>
                <td>
                    9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
                </td>
                <td>
                    貸出中のタイトル
                </td>
                <td>
                    0000/00/00
                </td>
                <td>
                    0000/00/00
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    
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