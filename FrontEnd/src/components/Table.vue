<template>
    <div class="table mt-7 mx-1 row-scroll">
        <table>
            <tr class="tableTitle">
                <th v-for="columnName in columnNames" :key=columnName.index>
                    {{ columnName.title }}
                </th>
            </tr>
            <tr class="tableItem" v-for="listItem in listItems" :key="listItem.index">
                <td v-for="columnName in columnNames" :key=columnName.index>
                    <span v-if="typeof(listItem[columnName.variableName]) === 'object' && listItem[columnName.variableName] !== null">
                        <v-btn @click="$emit(listItem[columnName.variableName].emitName, listItem[columnName.variableName].emitVariable)">
                            {{ listItem[columnName.variableName].text}}
                        </v-btn>
                    </span>
                    <span v-else>
                        {{ listItem[columnName.variableName]}}
                    </span>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: "Table",
    props: {
        columnNames: {
            type: Array,
            require: true,
            'default': () => [
                {
                    title:"デフォルト",
                    variableName:"default"
                }
            ]
        },
        listItems: {
            type: Array,
            require: true,
            'default': () => [
                {
                    default:"デフォルト1"
                },
                {
                    default:"デフォルト2"
                },
                {
                    default: {
                        text:"デフォルト3",
                        emitName:"hello",
                        emitVariable:""
                    }
                }
            ]
        }
    }
}
</script>
<style scoped>
.row-scroll {
    display: block;
    overflow-x: scroll;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}
table {
    border-collapse: collapse;
    width:100%;
}
th,
td {
    padding: 7px 20px 7px 20px;
}
.tableTitle {
    background-color:#e9e9e9;
    border-top: solid 1px#000000;
    border-bottom: solid 1px#000000;
}
.tableItem {
    text-align: left;
    border-bottom: solid 0.5px #e6e6e6;
}
.tableItem:hover {
    background-color:#f1f1f1;
}
</style>