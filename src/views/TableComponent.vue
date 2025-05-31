<template>
  <div class="table-page-wrapper">
    <h1>Table Component</h1>
    <BasicTable
      class="table-component-wrapper"
      :async="true"
      :enablePagination="false"
      :enableInfiniteScroll="true"
      :itemsPerPage="itemsPerPage"
      :totalItems="totalItems"
      :headers="tableHeaders"
      :tableData="tableData"
      :currentPage="currentPage"
      @onPageChange="handlePageChange"
      @onSort="handleSort"
      @cellClicked="handleTableCellClicked"
      @scrolledToEndInTable="loadMoreData(item)"
      >
      <!-- :headers="tableHeaders"
      :tableData="tableData" -->
    </BasicTable>
  </div>
</template>

<script setup>
import BasicTable from '@/components/sharedComponents/BasicTableV2.vue';
import { computed, ref } from 'vue';

let tableHeaders = [
  { text: "header 1", key: "header1" , 
    domFunc: (data) => {
      return data;
    },
  },
  { text: "header 2", key: "header2" , 
    domFunc: (data) => {
      return data;
    },
  },
  { text: "header 3", key: "header3" , 
    domFunc: (data) => {
      return data;
    },
  },
  { text: "header 4", key: "header4", sortable: true , 
    domFunc: (data) => {
      return data;
    },
  },
  { text: "header 5", key: "header5", sortable: true , 
    domFunc: (data) => {
      return data;
    },
  },
  { text: "header 6", key: "header6" , 
    domFunc: (data) => {
      return data;
    },
  },
  { text: "header 7", key: "header7" , 
    domFunc: (data) => {
      return data;
    },
  },
  { text: "header 8", key: "header8" , 
    domFunc: (data) => {
      return data;
    },
  },
]
let tableData = [
  
      {
        header1: "1",
        header2: "2",
        header3: "3",
        header4: "4",
        header5: "5",
        header6: "6",
        header7: "7",
        header8: "8",
      },
      {
        header1: "11",
        header2: "12",
        header3: "13",
        header4: "14",
        header5: "15",
        header6: "16",
        header7: "17",
        header8: "18",
      },
      {
        header1: "21",
        header2: "22",
        header3: "23",
        header4: "24",
        header5: "25",
        header6: "26",
        header7: "27",
        header8: "28",
      },
      {
        header1: "31",
        header2: "32",
        header3: "33",
        header4: "34",
        header5: "35",
        header6: "36",
        header7: "37",
        header8: "38",
      },
      {
        header1: "41",
        header2: "42",
        header3: "43",
        header4: "44",
        header5: "45",
        header6: "46",
        header7: "47",
        header8: "48",
      },
      {
        header1: "51",
        header2: "52",
        header3: "53",
        header4: "54",
        header5: "55",
        header6: "56",
        header7: "57",
        header8: "58",
      },
      {
        header1: "61",
        header2: "62",
        header3: "63",
        header4: "64",
        header5: "65",
        header6: "66",
        header7: "67",
        header8: "68",
      },
      {
        header1: "71",
        header2: "72",
        header3: "73",
        header4: "74",
        header5: "75",
        header6: "76",
        header7: "77",
        header8: "78",
      },
      {
        header1: "81",
        header2: "82",
        header3: "83",
        header4: "84",
        header5: "85",
        header6: "86",
        header7: "87",
        header8: "88",
      },
      {
        header1: "91",
        header2: "92",
        header3: "93",
        header4: "94",
        header5: "95",
        header6: "96",
        header7: "97",
        header8: "98",
      },
      {
        header1: "101",
        header2: "102",
        header3: "103",
        header4: "104",
        header5: "105",
        header6: "106",
        header7: "107",
        header8: "108",
      },
      {
        header1: "111",
        header2: "112",
        header3: "113",
        header4: "114",
        header5: "115",
        header6: "116",
        header7: "117",
        header8: "118",
      },
      {
        header1: "121",
        header2: "122",
        header3: "123",
        header4: "124",
        header5: "125",
        header6: "126",
        header7: "127",
        header8: "128",
      },
      {
        header1: "131",
        header2: "132",
        header3: "133",
        header4: "134",
        header5: "135",
        header6: "136",
        header7: "137",
        header8: "138",
      },
      {
        header1: "141",
        header2: "142",
        header3: "143",
        header4: "144",
        header5: "145",
        header6: "146",
        header7: "147",
        header8: "148",
      },
      {
        header1: "151",
        header2: "152",
        header3: "153",
        header4: "154",
        header5: "155",
        header6: "156",
        header7: "157",
        header8: "158",
      },
      {
        header1: "161",
        header2: "162",
        header3: "163",
        header4: "164",
        header5: "165",
        header6: "166",
        header7: "167",
        header8: "168",
      },
      {
        header1: "171",
        header2: "172",
        header3: "173",
        header4: "174",
        header5: "175",
        header6: "176",
        header7: "177",
        header8: "178",
      },
      {
        header1: "181",
        header2: "182",
        header3: "183",
        header4: "184",
        header5: "185",
        header6: "186",
        header7: "187",
        header8: "188",
      },
      {
        header1: "191",
        header2: "192",
        header3: "193",
        header4: "194",
        header5: "195",
        header6: "196",
        header7: "197",
        header8: "198",
      },
    
]
let currentPage = ref(1);
let totalItems = ref(20);
let itemsPerPage = ref(2);

function loadMoreData(item){
  console.log("item", item);
}

function handleTableCellClicked(data, cell){
  console.log("data", data);
  console.log("cell", cell);
}

function handlePageChange(page){
  console.log("page", page);
  currentPage.value = page;
}

function handleSort(sort){
  console.log("sort", sort);
}
</script>

<style lang="scss" scoped>
.table-page-wrapper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: white;
}
</style>
