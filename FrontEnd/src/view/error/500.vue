<template>
    <div class="mt-10">
        <v-icon size="100">
            fas fa-exclamation-triangle
        </v-icon>
        <h3 class="topText">
            500 Internal Server Error
        </h3>
        <br>
        <p class="subText">
            管理サーバーで問題が発生しました
        </p>
    </div>
</template>

<script>
export default {
    name: "Error500",
}
</script>
<style scoped>
div {
    text-align:center;
    color:#757575;
}
.topText {
    font-size: 63px;
}
.subText {
    font-size: 23px;
}
@media screen and (max-width:425px) {
    .topText {
        font-size: 40px;
    }
    .subText {
        font-size: 15px;
    }
}
</style>