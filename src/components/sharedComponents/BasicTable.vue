<script setup>
import { toRefs } from "vue";
import ScrollObserver from "./ScrollObserver.vue";
const emits=defineEmits(['cellClicked','scrolledToEndInTable'])
const props = defineProps({
  headers: {
    type: Array,
    required: true,
    default: () => [
      { text: "header 1", key: "header1" },
      { text: "header 2", key: "header2" },
      { text: "header 3", key: "header3" },
      { text: "header 4", key: "header4" },
      { text: "header 5", key: "header5" },
      { text: "header 6", key: "header6" },
      { text: "header 7", key: "header7" },
      { text: "header 8", key: "header8" },
    ],
  },
  tableData: {
    type: Array,
    required: true,
    default: () => [
      {
        header1: "row-1-col-1",
        header2: "row-1-col-2",
        header3: "row-1-col-3",
        header4: "row-1-col-4",
        header5: "row-1-col-5",
        header6: "row-1-col-6",
        header7: "row-1-col-7",
        header8: "row-1-col-8",
      },
      {
        header1: "row-2-col-1",
        header2: "row-2-col-2",
        header3: "row-2-col-3",
        header4: "row-2-col-4",
        header5: "row-2-col-5",
        header6: "row-2-col-6",
        header7: "row-2-col-7",
        header8: "row-2-col-8",
      },
      {
        header1: "row-3-col-1",
        header2: "row-3-col-2",
        header3: "row-3-col-3",
        header4: "row-3-col-4",
        header5: "row-3-col-5",
        header6: "row-3-col-6",
        header7: "row-3-col-7",
        header8: "row-3-col-8",
      },
      {
        header1: "row-4-col-1",
        header2: "row-4-col-2",
        header3: "row-4-col-3",
        header4: "row-4-col-4",
        header5: "row-4-col-5",
        header6: "row-4-col-6",
        header7: "row-4-col-7",
        header8: "row-4-col-8",
      },
      {
        header1: "row-5-col-1",
        header2: "row-5-col-2",
        header3: "row-5-col-3",
        header4: "row-5-col-4",
        header5: "row-5-col-5",
        header6: "row-5-col-6",
        header7: "row-5-col-7",
        header8: "row-5-col-8",
      },
      {
        header1: "row-6-col-1",
        header2: "row-6-col-2",
        header3: "row-6-col-3",
        header4: "row-6-col-4",
        header5: "row-6-col-5",
        header6: "row-6-col-6",
        header7: "row-6-col-7",
        header8: "row-6-col-8",
      },
      {
        header1: "row-7-col-1",
        header2: "row-7-col-2",
        header3: "row-7-col-3",
        header4: "row-7-col-4",
        header5: "row-7-col-5",
        header6: "row-7-col-6",
        header7: "row-7-col-7",
        header8: "row-7-col-8",
      },
      {
        header1: "row-8-col-1",
        header2: "row-8-col-2",
        header3: "row-8-col-3",
        header4: "row-8-col-4",
        header5: "row-8-col-5",
        header6: "row-8-col-6",
        header7: "row-8-col-7",
        header8: "row-8-col-8",
      },
      {
        header1: "row-9-col-1",
        header2: "row-9-col-2",
        header3: "row-9-col-3",
        header4: "row-9-col-4",
        header5: "row-9-col-5",
        header6: "row-9-col-6",
        header7: "row-9-col-7",
        header8: "row-9-col-8",
      },
      {
        header1: "row-10-col-1",
        header2: "row-10-col-2",
        header3: "row-10-col-3",
        header4: "row-10-col-4",
        header5: "row-10-col-5",
        header6: "row-10-col-6",
        header7: "row-10-col-7",
        header8: "row-10-col-8",
      },
      {
        header1: "row-11-col-1",
        header2: "row-11-col-2",
        header3: "row-11-col-3",
        header4: "row-11-col-4",
        header5: "row-11-col-5",
        header6: "row-11-col-6",
        header7: "row-11-col-7",
        header8: "row-11-col-8",
      },
      {
        header1: "row-12-col-1",
        header2: "row-12-col-2",
        header3: "row-12-col-3",
        header4: "row-12-col-4",
        header5: "row-12-col-5",
        header6: "row-12-col-6",
        header7: "row-12-col-7",
        header8: "row-12-col-8",
      },
      {
        header1: "row-13-col-1",
        header2: "row-13-col-2",
        header3: "row-13-col-3",
        header4: "row-13-col-4",
        header5: "row-13-col-5",
        header6: "row-13-col-6",
        header7: "row-13-col-7",
        header8: "row-13-col-8",
      },
      {
        header1: "row-14-col-1",
        header2: "row-14-col-2",
        header3: "row-14-col-3",
        header4: "row-14-col-4",
        header5: "row-14-col-5",
        header6: "row-14-col-6",
        header7: "row-14-col-7",
        header8: "row-14-col-8",
      },
      {
        header1: "row-15-col-1",
        header2: "row-15-col-2",
        header3: "row-15-col-3",
        header4: "row-15-col-4",
        header5: "row-15-col-5",
        header6: "row-15-col-6",
        header7: "row-15-col-7",
        header8: "row-15-col-8",
      },
      {
        header1: "row-16-col-1",
        header2: "row-16-col-2",
        header3: "row-16-col-3",
        header4: "row-16-col-4",
        header5: "row-16-col-5",
        header6: "row-16-col-6",
        header7: "row-16-col-7",
        header8: "row-16-col-8",
      },
      {
        header1: "row-17-col-1",
        header2: "row-17-col-2",
        header3: "row-17-col-3",
        header4: "row-17-col-4",
        header5: "row-17-col-5",
        header6: "row-17-col-6",
        header7: "row-17-col-7",
        header8: "row-17-col-8",
      },
      {
        header1: "row-18-col-1",
        header2: "row-18-col-2",
        header3: "row-18-col-3",
        header4: "row-18-col-4",
        header5: "row-18-col-5",
        header6: "row-18-col-6",
        header7: "row-18-col-7",
        header8: "row-18-col-8",
      },
      {
        header1: "row-19-col-1",
        header2: "row-19-col-2",
        header3: "row-19-col-3",
        header4: "row-19-col-4",
        header5: "row-19-col-5",
        header6: "row-19-col-6",
        header7: "row-19-col-7",
        header8: "row-19-col-8",
      },
      {
        header1: "row-20-col-1",
        header2: "row-20-col-2",
        header3: "row-20-col-3",
        header4: "row-20-col-4",
        header5: "row-20-col-5",
        header6: "row-20-col-6",
        header7: "row-20-col-7",
        header8: "row-20-col-8",
      },
    ],
  },
});

const tableCellClicked=(data,cell)=>{
  emits('cellClicked',data,cell)
}

function handelLoadMoreData(emit){
  emit("scrolledToEndInTable");
}
function onTableCellKeyDown(event,rowData,cell){
  console.log(event.key)
  emits('onTableCellKeyDown',rowData,cell)
}
function onTableCellBlur(event,rowData,cell){
  console.log("on table cell blur", rowData)
  emits('onTableCellBlur',rowData,cell)
}
</script>

<template>
  <div class="table-wrapper">
    <table>
      <tbody>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
          <td
            v-for="(cell, cellIndex) in headers"
            :key="cellIndex"
            :class="cell.classes"
            @click.stop="tableCellClicked(rowData,cell)"
            tabindex="0"
            @keydown="onTableCellKeyDown($event,rowData,cell)"
            @blur="onTableCellBlur($event,rowData,cell)"

          >
            <slot :name="'cell-' + cell.key" :rowData="rowData" :cell="cell" :tableCellClicked="{tableCellClicked}">
              {{
                cell.domFunc
                  ? cell.domFunc(rowData[cell.key] ? rowData[cell.key] : "-")
                  : rowData[cell.key]
              }}
            </slot>
          </td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            :class="header.headerClasses"
          >
            <slot :name="'header-' + index" :cell="header">
              {{ header.text }}
            </slot>
          </th>
        </tr>
      </thead>
    </table>
    <ScrollObserver @scrolledToEnd="(...args) => handelLoadMoreData(emits)"/>
  </div>
</template>



<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
  background: white;
  table {
    border-collapse: collapse;
    width: 100%;

    thead {
      width: 100%;
      position: sticky;
      top: 0;
    }

    tr {
      th {
        padding: 0.5rem;
        text-align: left;
        color: black;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 138%;
        word-wrap: break-word;
        vertical-align: middle;
        text-transform: capitalize;

        &:first-child {
          padding-left: 1rem;
        }

        &:last-child {
          padding-right: 1rem;
        }

        &.center {
          text-align: center;
        }

        &.right {
          text-align: right;
        }
      }

      td {
        text-align: left;
        font-weight: 400;
        line-height: 150%;
        overflow: hidden;
        color: #B697ED;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 138%;
        height: 3.5rem;
        padding: 0 0.5rem;

        &:first-child {
          padding-left: 0.75rem;
        }

        &:last-child {
          padding-right: 0.75rem;
        }

        &.center {
          text-align: center;
        }

        &.right {
          text-align: right;
        }
      }

      &:has(th) {
        background-color: #B697ED;
      }

      &:has(td):nth-child(2n-1) {
        background: white;
      }

      &:has(td):nth-child(2n) {
        background: #D9D9D9;
      }
    }
    
    tbody {
      position: relative;
      tr {
        border-bottom: 0.0625rem solid #D9D9D9;
        background: white;
      }
      tr:hover {
        background: #CBB8ED;
        cursor: pointer;
      }
    }
  }

  &::-webkit-scrollbar-thumb {
    background-color: #B697ED;
    border-radius: 1rem;
  }
}
</style>
