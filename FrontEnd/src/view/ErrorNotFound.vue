<template>
    <div>
        <span class="topText">
            404 NotFound
        </span>
        <br>
        <span class="subText">
            ページが見つかりませんでした
        </span>
    </div>
</template>

<script>
export default {
    name: "ErrorNotFound"
}
</script>
<style scoped>
div {
    text-align:center;
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