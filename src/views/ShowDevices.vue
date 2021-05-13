<template>
  <div class="show-devices">

  <b-modal 
    centered
    hide-footer 
    size="xl" 
    class="text-center"
    id="bv-modal-example" 
  >
    <b-container>
      <b-row align-h="center" class=" text-center">
        <p style="font-weight: bold; font-size: 20px;">Model Details</p>
      </b-row>
      <b-row class="bv-example-row" align-h="center" align-v="center" v-if="detailsLoading">
        <b-row align-h="center" align-v="center">
          <b-spinner></b-spinner>
        </b-row>
        <b-row align-h="center" align-v="center">
          <strong>Loading...</strong>
        </b-row>
      </b-row>

      <b-row v-if="detailsEmpty">
        <p>Nothing to show</p>
      </b-row>

      <b-row v-if="detailsNotEmpty">

          <b-table
          hover
          striped
          small
          scrollable
          id="my-details-table"
          :items="details"
          :per-page="detailsPerPage"
          :current-page="detailsCurrentPage"
        >
        </b-table>
        <b-pagination
          v-model="detailsCurrentPage"
          :total-rows="totalDetails"
          :per-page="detailsPerPage"
          aria-controls="my-details-table"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
        ></b-pagination>
        <p class="mt-3">Current Page: {{ detailsCurrentPage }}</p>

      </b-row>

      <b-row>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close</b-button>
      </b-row>
    </b-container>
    
  </b-modal>

    <b-container>
      <b-row class="overflow-auto">
       
        <b-row>
          <b-col cols="10" class="text-start">
          <h3>Model Types</h3>
          <h6 style="color: #a3a3a3">Tap to see details</h6>
          </b-col>
          <b-col cols="2" class="text-end">
            <b-button variant="primary">Add New</b-button>
          </b-col>
        </b-row>
        <b-row class="bv-example-row" align-h="center" align-v="center" v-if="loading">
          <b-row align-h="center" align-v="center">
            <b-spinner></b-spinner>
          </b-row>
          <b-row align-h="center" align-v="center">
            <strong>Loading...</strong>
          </b-row>
        </b-row>
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
import DetailsModal from '@/components/DetailsModal.vue'

@Component({
  components: {
    Header
  }
})
export default class ShowDevices extends Vue {
  data: Array<AModelType> = [];
  details: Array<AModelData> = [];
  currentPage = 1;
  perPage = 14;
  detailsCurrentPage = 1;
  detailsPerPage = 10;
  isLoading = true;
  detailsLoadingStatus = true;

  get loading(){
    return this.isLoading;
  }
  set loading(status) {
    this.isLoading = status
  }

  get detailsLoading() {
    return this.detailsLoadingStatus;
  }

  set detailsLoading(status) {
    this.detailsLoadingStatus = status
  }

  get totalDevices() {
    return this.data.length;
  }

  get totalDetails() {
    return this.data.length;
  }

  get detailsNotEmpty() {
    return this.details.length !== 0
  }

  get detailsEmpty() {
    return !this.detailsLoading && this.details.length === 0
  }

  onRowSelected(item: Array<AModelType>) {
    this.details = [];
    this.detailsCurrentPage = 1;
    this.detailsLoading = true;

    const token = this.$store.getters.userToken;
    const brandName = item[0].BrandId;
    const modelName = item[0].Name;

    this.$store
          .dispatch("getModelData", {token, brandName, modelName} )
          .then(() => {
            this.details = this.$store.getters.modelDataList;
            console.log(JSON.stringify(this.details))
            this.detailsLoading = false;
          })
    this.$bvModal.show('bv-modal-example')
  }

  beforeMount() {
    
    if(this.$store.getters.userExists) {
      this.loading = true;
      this.$store
              .dispatch("getAllModelTypes", this.$store.getters.userToken)
                .then(() => { 
                  this.data = this.$store.getters.modelTypes; 
                  this.loading = false;
                })
    } else {
      this.$router.push('/')
    }
  }
}
</script>

