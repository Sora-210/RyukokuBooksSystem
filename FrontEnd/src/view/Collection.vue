<template>
    <div pa-6 ma-4>
        <v-row>
            <v-col cols=12 sm=3>
                <v-img :src=this.collectionData.imgUrl ></v-img>
            </v-col>
            <v-col cols=0 sm=1>
            </v-col>
            <v-col cols=12 sm=8>
                <h1>
                    {{ this.collectionData.title }}
                </h1>
                <h2>
                    |
                    <span v-for="author in this.collectionData.authors" :key="author.index">
                        {{ author }} |
                    </span>
                </h2>
                <RentalStatusView class="mt-5" :rentalStatus=rentalStatus >
                </RentalStatusView>
                <RentalActionBtn class="mt-5" :rentalStatus=rentalStatus @rental="isRentalDialog = true" @return="isReturnDialog = true">
                </RentalActionBtn>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <CollectionDataTable :collectionData=collectionData>
        </CollectionDataTable>
        <RentalDialog :uuid=$route.params.uuid :isDialog=isRentalDialog @reload="getBookData" @close="isRentalDialog = false" @error="emitError">
        </RentalDialog>
        <ReturnDialog :uuid=$route.params.uuid :isDialog=isReturnDialog @reload="getBookData" @close="isReturnDialog = false" @error="emitError">
        </ReturnDialog>
        <v-overlay :value="isLoading" color="white" opacity=1>
            <img src="../assets/book.gif">
        </v-overlay>
    </div>
</template>

<script>
import RentalStatusView from '../components/collection/RentalStatusView'
import RentalActionBtn from '../components/collection/RentalActionBtn'
import CollectionDataTable from '../components/collection/DataTable'
import RentalDialog from '../components/collection/RentalDialog'
import ReturnDialog from '../components/collection/ReturnDialog'

export default {
    components: {
        RentalStatusView,
        RentalActionBtn,
        CollectionDataTable,
        RentalDialog,
        ReturnDialog
    },
    data: function() {
        return {
            isLoading:true,
            rentalStatus:false,
            collectionData:{
                title:"",
                authors:"",
                imgUrl:"",
                publisher:"",
                publishedDate:"",
                uuid:"",
                isbn:"",
                note:"",
                registrationDate:"",
                ndc:"",
            },
            isRentalDialog: false,
            isReturnDialog: false
        }
    },
    mounted: async function() {
        await this.getBookData()
    },
    methods: {
        getBookData: async function() {
            try {
                const getResponse = await this.axios.get(`/collections/${this.$route.params.uuid}`)
                this.collectionData = getResponse.data.data[0]
                this.rentalStatus = getResponse.data.data[0].rentalStatus
                this.isLoading = false
            } catch(e) {
                if (e.response.status === 404) {
                    this.$router.push('/404')
                } else {
                    this.$router.push('/500')
                }
            }
        },
        emitError(message)  {
            this.$emit('error', message)
        },
    }
}
</script>