<template>
    <div class="mt-10">
        <v-icon size="100">
            fas fa-exclamation-triangle
        </v-icon>
        <h3 class="topText">
            404 NotFound
        </h3>
        <br>
        <p class="subText">
            ページが見つかりませんでした
        </p>
    </div>
</template>

<script>
export default {
    name: "Error404",
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