<template>
    <div class="tableBox">
        <table>
            <tr class="tableTitle">
                <th>UUID</th>
                <th>ISBN</th>
                <th>NDC</th>
                <th>登録日</th>
                <th>備考</th>
                <th></th>
            </tr>
            <tr class="tableItem" v-for="collectionItem in collectionList" :key="collectionItem.id">
                <!--UUID-->
                <td>
                    <router-link :to="`/collection/` + collectionItem.uuid">
                        {{ collectionItem.uuid}}
                    </router-link>
                </td>
                <!--ISBN-->
                <td>{{ collectionItem.isbn }}</td>
                <!--NDC-->
                <td>{{ collectionItem.ndc }}</td>
                <!--登録日-->
                <td>{{ collectionItem.registrationDate }}</td>
                <!--備考-->
                <td>{{ collectionItem.note }}</td>
                <!--[編集アイコン]-->
                <td>
                    <v-btn size="small" color="primary" text @click="$emit('on-edit', collectionItem.uuid)">
                        <v-icon>fas fa-edit</v-icon>
                    </v-btn>
                </td>
            </tr>
        </table>
    </div>
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
@import url("../../../assets/css/table.css");
</style>