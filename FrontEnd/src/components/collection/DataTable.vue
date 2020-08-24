<template>
    <v-row>
        <v-col>
            <p style="font-size:20px;">
                - CollectionInfo
            </p>
            <v-simple-table>
                <tbody>
                    <tr>
                        <td>UUID</td>
                        <td>{{ this.collectionData.uuid }}</td>
                    </tr>
                    <tr>
                        <td>タイトル</td>
                        <td>{{ this.collectionData.title }}</td>
                    </tr>
                    <tr>
                        <td>著作</td>
                        <td>
                            |
                            <span v-for="author in this.collectionData.authors" :key="author.index">
                                {{ author }} |
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>ISBN</td>
                        <td>{{ this.collectionData.isbn }}</td>
                    </tr>
                    <tr>
                        <td>NDC</td>
                        <td>{{ this.collectionData.ndc }}</td>
                    </tr>
                    <tr>
                        <td>出版社</td>
                        <td>{{ this.collectionData.publisher }}</td>
                    </tr>
                    <tr>
                        <td>発売日時</td>
                        <td>{{ this.collectionData.publishedDate }}</td>
                    </tr>
                    <tr>
                        <td>登録日</td>
                        <td>{{ this.collectionData.registrationDate }}</td>
                    </tr>
                    <tr>
                        <td>備考</td>
                        <td>{{ this.collectionData.note }}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        collectionData: {
            type: Object,
            default: () => ({
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
                })
        }
    }
}
</script>