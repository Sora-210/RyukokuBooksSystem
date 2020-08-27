<template>
    <router-link :to="url">
        <v-list-item link>
            <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
                {{ name }}
            </v-list-item-title>
        </v-list-item>
    </router-link>
</template>
<script>
export default {
    name:"NavItem",
    props: {
        name: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    }
}
</script>