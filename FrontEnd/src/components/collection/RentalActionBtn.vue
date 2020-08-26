<template>
    <div>
        <v-btn v-if="rentalStatus" @click="$emit('rental')" large color="success">
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
        rentalStatus: {
            type: Boolean,
            default: false
        }
    }
}
</script>