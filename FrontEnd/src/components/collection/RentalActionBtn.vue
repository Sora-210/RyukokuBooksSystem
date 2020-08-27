<template>
    <div>
        <v-btn v-if="isRentalStatus" @click="$emit('rental')" large color="success">
            借りる
        </v-btn>
        <v-btn v-else @click="$emit('return')" dark large color="red">
            返す
        </v-btn>
    </div>
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