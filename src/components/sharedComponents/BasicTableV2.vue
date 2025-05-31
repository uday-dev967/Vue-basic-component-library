<script setup>
import { toRefs, ref, computed } from "vue";
import ScrollObserver from "./ScrollObserver.vue";

/**
 * OTable - A versatile table component with dynamic headers, content, and infinite scroll
 */
const emits = defineEmits([
  'cellClicked',
  'scrolledToEndInTable', 
  'onTableCellKeyDown', 
  'onTableCellBlur',
  'onSort',
  'onPageChange'
]);

const props = defineProps({
  /**
   * Array of header objects that define the table columns
   * @example [{ text: "Name", key: "name", classes: "center", headerClasses: "right", sortable: true }]
   */
   headers: {
    type: Array,
    required: true,
    default: () => [],
  },

  /**
   * Array of data objects to be displayed in the table
   * Each object should have keys matching the header keys
   */
  tableData: {
    type: Array,
    required: true,
    default: () => [],
  },

  /**
   * Enables or disables the hover effect on table rows
   */
  enableHover: {
    type: Boolean,
    default: true
  },
  
  /**
   * Enables or disables the infinite scroll functionality
   */
  enableInfiniteScroll: {
    type: Boolean,
    default: true
  },

  /**
   * Enables or disables pagination
   */
  enablePagination: {
    type: Boolean,
    default: false
  },

  /**
   * Number of items per page when pagination is enabled
   */
  itemsPerPage: {
    type: Number,
    default: 10
  },

  /**
   * Current page number when pagination is enabled
   */
  currentPage: {
    type: Number,
    default: 1
  },

  /**
   * Total number of items for pagination
   */
  totalItems: {
    type: Number,
    default: 0
  },

  /**
   * If true, all user actions (sort, pagination) will be emitted
   * If false, actions will be handled internally
   */
  async: {
    type: Boolean,
    default: false
  }
});

// Internal state for sorting and pagination
const sortState = ref({
  key: null,
  direction: 'asc'
});

// Computed properties for sorting and pagination
const sortedData = computed(() => {
  if (!sortState.value.key || props.async) {
    return props.tableData;
  }

  return [...props.tableData].sort((a, b) => {
    let aValue = a[sortState.value.key];
    let bValue = b[sortState.value.key];

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    // Convert string numbers to actual numbers if possible
    const aIsNumber = typeof aValue === 'string' && !isNaN(aValue);
    const bIsNumber = typeof bValue === 'string' && !isNaN(bValue);

    if (aIsNumber && bIsNumber) {
      // Both are numbers, compare numerically
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      // Both are strings, compare case-insensitively
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue === bValue) return 0;
    
    const comparison = aValue > bValue ? 1 : -1;
    return sortState.value.direction === 'asc' ? comparison : -comparison;
  });
});

const paginatedData = computed(() => {
  if (!props.enablePagination || props.async) {
    return sortedData.value;
  }

  const start = (props.currentPage - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;
  return sortedData.value.slice(start, end);
});

const totalPages = computed(() => {
  if (!props.enablePagination) return 1;
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

// Methods for handling sorting and pagination
const handleSort = (header) => {
  if (!header.sortable) return;

  if (props.async) {
    emits('onSort', {
      key: header.key,
      direction: sortState.value.key === header.key && sortState.value.direction === 'asc' ? 'desc' : 'asc'
    });
    return;
  }

  if (sortState.value.key === header.key) {
    sortState.value.direction = sortState.value.direction === 'asc' ? 'desc' : 'asc';
  } else {
    sortState.value.key = header.key;
    sortState.value.direction = 'asc';
  }
};

const handlePageChange = (page) => {
  emits('onPageChange', page);
};

/**
 * Handles cell click events and emits data
 */
const tableCellClicked = (data, cell) => {
  emits('cellClicked', data, cell);
};

/**
 * Handles reaching the end of the table for infinite scroll
 */
function handelLoadMoreData() {
  emits("scrolledToEndInTable");
}

/**
 * Handles keydown events on table cells
 */
function onTableCellKeyDown(event, rowData, cell) {
  emits('onTableCellKeyDown', event, rowData, cell);
}

/**
 * Handles blur events on table cells
 */
function onTableCellBlur(event, rowData, cell) {
  emits('onTableCellBlur', rowData, cell);
}
</script>

<template>
  <div class="table-wrapper">
    <table>
      <tbody>
        <tr 
          v-for="(rowData, rowIndex) in paginatedData" 
          :key="rowIndex"
          :class="{ 'hover-enabled': enableHover }"
        >
          <td
            v-for="(cell, cellIndex) in headers"
            :key="cellIndex"
            :class="cell.classes"
            @click.stop="tableCellClicked(rowData, cell)"
            tabindex="0"
            @keydown="onTableCellKeyDown($event, rowData, cell)"
            @blur="onTableCellBlur($event, rowData, cell)"
          >
            <slot 
              :name="'cell-' + cell.key" 
              :rowData="rowData" 
              :cell="cell" 
              :tableCellClicked="{ tableCellClicked }"
            >
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
            :class="[
              header.headerClasses,
              { 
                'sortable': header.sortable,
                'sorted-asc': sortState.key === header.key && sortState.direction === 'asc',
                'sorted-desc': sortState.key === header.key && sortState.direction === 'desc'
              }
            ]"
            @click="header.sortable && handleSort(header)"
          >
            <slot :name="'header-' + index" :cell="header">
              <div class="header-content">
                {{ header.text }}
                <span v-if="header.sortable" class="sort-icon">
                  <svg
                    v-if="sortState.key !== header.key"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M7 15l5 5 5-5M7 9l5-5 5 5"/>
                  </svg>
                  <svg
                    v-else-if="sortState.direction === 'asc'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M7 15l5 5 5-5"/>
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M7 9l5-5 5 5"/>
                  </svg>
                </span>
              </div>
            </slot>
          </th>
        </tr>
      </thead>
    </table>
    <ScrollObserver 
      v-if="enableInfiniteScroll"
      @scrolledToEnd="(...args) => handelLoadMoreData()"
    />
    <div v-if="enablePagination" class="pagination">
      <button 
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
        class="pagination-button"
      >
        Previous
      </button>
      <span class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button 
        :disabled="currentPage === totalPages"
        @click="handlePageChange(currentPage + 1)"
        class="pagination-button"
      >
        Next
      </button>
    </div>
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
      z-index: 1;
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

        &.sortable {
          cursor: pointer;
          user-select: none;

          &:hover {
            background-color: rgba(182, 151, 237, 0.1);
          }

          .header-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .sort-icon {
            display: flex;
            align-items: center;
          }
        }

        &.sorted-asc,
        &.sorted-desc {
          background-color: rgba(182, 151, 237, 0.2);
        }
      }
      
      td {
        text-align: left;
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
        
        &.hover-enabled:hover, &:hover {
          background: #CBB8ED;
          cursor: pointer;
        }
      }
    }
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #B697ED;
    border-radius: 1rem;
  }
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-top: 1px solid #D9D9D9;

  .pagination-button {
    padding: 0.5rem 1rem;
    border: 1px solid #B697ED;
    border-radius: 0.25rem;
    background: white;
    color: #B697ED;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: #B697ED;
      color: white;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .page-info {
    font-size: 0.875rem;
    color: #666;
  }
}
</style>