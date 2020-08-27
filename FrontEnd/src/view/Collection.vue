<template>
    <div pa-6 ma-4>
        <v-row>
            <v-col cols=12 sm=3>
                <v-img :src=collectionData.imgUrl></v-img>
            </v-col>
            <v-col cols=0 sm=1>
            </v-col>
            <v-col cols=12 sm=8>
                <h1>{{ collectionData.title }}</h1>
                <h2>
                    |
                    <span v-for="author in collectionData.authors" :key="author.index">
                        {{ author }} |
                    </span>
                </h2>
                <RentalStatusView class="mt-5" :isRentalStatus=isRentalStatus >
                </RentalStatusView>
                <RentalActionBtn class="mt-5" :isRentalStatus=isRentalStatus @rental="isRentalDialog = true" @return="isReturnDialog = true">
                </RentalActionBtn>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <CollectionDataTable :collectionData=collectionData>
        </CollectionDataTable>
        <RentalDialog :uuid=collectionData.uuid :isDialog=isRentalDialog @reload="getBookData" @close="isRentalDialog = false" @error="emitError">
        </RentalDialog>
        <ReturnDialog :uuid=collectionData.uuid :isDialog=isReturnDialog @reload="getBookData" @close="isReturnDialog = false" @error="emitError">
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
            isRentalStatus:false,
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
    mounted: function() {
        this.getBookData()
    },
    methods: {
        getBookData() {
            this.managerApi.get(`/collections/${this.$route.params.uuid}`)
                .then((getRes) => {
                    this.collectionData = getRes.data.data[0]
                    this.isRentalStatus = getRes.data.data[0].rentalStatus
                    this.isLoading = false
                })
                .catch((e) => {
                    if (e.response.status === 404) {
                        this.$router.push('/404')
                    } else {
                        this.$router.push('/500')
                    }
                })
        },
        emitError(message)  {
            this.$emit('error', message)
        },
    }
}
</script>