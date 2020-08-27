<template>
    <table class="rentalInfo">
        <tr>
            <th>貸し出し状況</th>
            <th>
                <i v-if="isRentalStatus" class="far fa-circle" style="color:green;"> (貸出可)</i>
                <i v-else class="fas fa-times" style="color:red;"> (貸出中)</i>
            </th>
        </tr>
    </table>
</template>
<script>
export default {
    props: {
        isRentalStatus: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss" scoped>
.rentalInfo {
    padding:5px;
    border: 1px solid #000000;
    border-collapse:collapse;
    tr th {
        border: 1px solid #000000;
        padding: 5px;
    }
}
</style>