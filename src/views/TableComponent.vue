<template>
  <div class="table-page-wrapper">
    <h1>Table Component</h1>
    <BasicTable
      class="table-component-wrapper"
      @cellClicked="handleTableCellClicked"
      @scrolledToEndInTable="loadMoreData(item)"
      >
      <!-- :headers="tableHeaders"
      :tableData="tableData" -->
    </BasicTable>
  </div>
</template>

<script setup>
import BasicTable from '@/components/sharedComponents/BasicTable.vue';
import { computed } from 'vue';

let tableHeaders = [
  {
    text: "Project Name",
    key: "projectName",
    domFunc: (data) => {
      console.log(data)
      return data;
    },
  },
  {
    text: "Request Type",
    key: "serviceType",
    domFunc: (data) => {
      return data;
    },
  },
  {
    text: "No of Spaces",
    key: "numberOfSpaces",
    domFunc: (data) => {
      console.log("data", data);
      return data;
    },
  },
  // {
  //   text: "Assigned To",
  //   key: "assignedTo",
  //   domFunc: (data) => {
  //     return data;
  //   },
  // },
  // {
  //   text: "Status",
  //   key: "status",
  //   domFunc: (data) => {
  //     console.log("status data form table", data);
  //     return data;
  //   },
  // },
]
let tableData = [
  {
    projectName: "Project 1",
    serviceType: "Service Type 1",
    numberOfSpaces: 1,
  },  
  {
    projectName: "Project 2",
    serviceType: "Service Type 2",
    numberOfSpaces: 2,
  },  
  {
    projectName: "Project 3",
    serviceType: "Service Type 3",
    numberOfSpaces: 3,
  },  
  {
    projectName: "Project 4",
    serviceType: "Service Type 4",
    numberOfSpaces: 4,
  },    
  {
    projectName: "Project 5",
    serviceType: "Service Type 5",
    numberOfSpaces: 5,
  },   
  {
    projectName: "Project 6",
    serviceType: "Service Type 6",
    numberOfSpaces: 6,
  },  
  {
    projectName: "Project 7",
    serviceType: "Service Type 7",
    numberOfSpaces: 7,
  },   
  {
    projectName: "Project 8",
    serviceType: "Service Type 8",
    numberOfSpaces: 8,
  },    
  {
    projectName: "Project 9",
    serviceType: "Service Type 9",
    numberOfSpaces: 9,
  },
  {
    projectName: "Project 10",
    serviceType: "Service Type 10",
    numberOfSpaces: 10,
  },
  {
    projectName: "Project 11",
    serviceType: "Service Type 11",
    numberOfSpaces: 11,
  },
  {
    projectName: "Project 12",
    serviceType: "Service Type 12",
    numberOfSpaces: 12,
  },
  {
    projectName: "Project 13",
    serviceType: "Service Type 13",
    numberOfSpaces: 13,
  },
  {
    projectName: "Project 14",
    serviceType: "Service Type 14",
    numberOfSpaces: 14,
  },
  {
    projectName: "Project 15",
    serviceType: "Service Type 15",
    numberOfSpaces: 15,
  },  
  {
    projectName: "Project 16",
    serviceType: "Service Type 16",
    numberOfSpaces: 16,
  },
  
  
]

function loadMoreData(item){
  console.log("item", item);
}

function handleTableCellClicked(data, cell){
  console.log("data", data);
  console.log("cell", cell);
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
