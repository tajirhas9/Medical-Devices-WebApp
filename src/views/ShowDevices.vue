<template>
  <div class="show-devices">

<!--

  Dialog that shows the details of the selected type

-->
  <DetailsModal :show="shownDetails" :item="typeSelected" v-on:close="shownDetails=false"/>
  <AddNewModal :show="shownAddNew" v-on:close="shownAddNew=false"/>
    <b-container>
      <b-row class="overflow-auto">
       <!--
        
        Heading

       -->
        <b-row>
          <b-col cols="10" class="text-start">
          <h3>Model Types</h3>
          <h6 style="color: #a3a3a3">Tap to see details</h6>
          </b-col>
          <b-col cols="2" class="text-end">
            <b-button variant="primary" @click="shownAddNew=true">Add New</b-button>
          </b-col>
        </b-row>
        <!--

          - Loading view
          - Shows when data is not loaded 

        -->
        <b-row class="bv-example-row" align-h="center" align-v="center" v-if="loading">
          <b-row align-h="center" align-v="center">
            <b-spinner></b-spinner>
          </b-row>
          <b-row align-h="center" align-v="center">
            <strong>Loading...</strong>
          </b-row>
        </b-row>

        <!--

          Table of types

        -->

        <b-table
          hover
          striped
          large
          selectable
          id="my-table"
          :items="data"
          :per-page="perPage"
          :current-page="currentPage"
          select-mode="single"
          @row-selected="onRowSelected"
        >
        </b-table>

        <!--

          Pagination

        -->
        <b-pagination
          v-model="currentPage"
          :total-rows="totalDevices"
          :per-page="perPage"
          aria-controls="my-table"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
        ></b-pagination>
        <p class="mt-3">Current Page: {{ currentPage }}</p>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { AModelData, AModelType } from '@/store/modules/device-store';
import Vue from 'vue'
import Component from 'vue-class-component'
import Header from '@/components/Header.vue'
import DetailsModal from '@/components/details-modal.vue'
import AddNewModal from '@/components/add-new-modal.vue';
import {NotAuthorizedError} from '@/errors'

@Component({
  components: {
    DetailsModal,
    AddNewModal
  }
})
export default class ShowDevices extends Vue {
  
  // Data state
  // Holds the array that is viewed in the table
  data: Array<AModelType> = [];
  
  // Pagination data
  currentPage = 1;
  perPage = 14;

  isLoading = true;
  showDetails = false;    // tracks the dialog view off/on
  showAddNew = false;     // tracks the dialog view for add new 

  selectedType:Array<AModelType> = [];  // stores the clicked row from the table


  // Computed values
  get loading(){
    return this.isLoading;
  }
  set loading(status) {
    this.isLoading = status
  }

  get totalDevices() {
    return this.data.length;
  }

  get shownDetails() {
    return this.showDetails;
  }

  set shownDetails(status) {
    this.showDetails = status;
  }

  get shownAddNew() {
    return this.showAddNew;
  }

  set shownAddNew(status) {
    this.showAddNew = status;
  }

  get typeSelected() {
    return this.selectedType;
  }

  set typeSelected(newSelection) {
    this.selectedType = newSelection;
  }


  // Invokes whenever a row is clicked
  onRowSelected(item: Array<AModelType>) {
    this.shownDetails = true;
    this.typeSelected = item;
  }

  // Lifecycle hook
  beforeMount() {
    if(this.$store.getters.userExists) {
      this.loading = true;
      this.$store
              .dispatch("getAllModelTypes", this.$store.getters.userToken)
                .then(() => { 
                  this.data = this.$store.getters.modelTypes; 
                  this.loading = false;
                })
                .catch((e)=> {
                  if(e instanceof NotAuthorizedError) {
                    console.log("User not logged in / session expired")
                  }
                })
    } else {
      this.$router.push('/')
    }
  }
}
</script>

