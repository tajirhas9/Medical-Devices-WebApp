<template>
  <b-modal
    centered
    hide-footer
    size="xl"
    class="text-center"
    id="bv-modal-details"
    @hidden="closeModal"
  >
    <b-container>
      <b-row align-h="center" class="text-center">
        <p style="font-weight: bold; font-size: 20px">Model Details</p>
      </b-row>

      <!--
        - Loading 
        - shows only when data is being fetched
      -->
      <b-row
        class="bv-example-row"
        align-h="center"
        align-v="center"
        v-if="detailsLoading"
      >
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
        <b-button class="mt-3" block @click="closeModal">Close</b-button>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script lang="ts">
import { AModelData, AModelType } from "@/store/modules/device-store";
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class DetailsModal extends Vue {
  @Prop() private show!: boolean;
  @Prop() private item!: Array<AModelType>;

  // Data

  currentPage = 1;
  detailsPerPage = 10;
  detailsCurrentPage = 1;
  detailsLoadingStatus = true;
  details: Array<AModelData> = [];

  // Computed Values

  get detailsLoading() {
    return this.detailsLoadingStatus;
  }

  set detailsLoading(status) {
    this.detailsLoadingStatus = status;
  }

  get totalDetails() {
    return this.details.length;
  }

  get detailsNotEmpty() {
    return this.details.length !== 0;
  }

  get detailsEmpty() {
    return !this.detailsLoading && this.details.length === 0;
  }

  // Methods

  closeModal() {
    this.$emit("close");
  }

  // Watches

  @Watch("show")
  OnShowChange(val: boolean, oldVal: boolean) {
    /**
     * This method keeps track of the show variable
     * and decides whether to show or hide the modal
     */
    if (val) {
      /**
       * Show the model
       * - Fetch data
       * - Stop loading
       * - Show data
       */
      try {
        const token = this.$store.getters.userToken;
        const brandName = this.item[0].BrandId;
        const modelName = this.item[0].Name;
        this.$bvModal.show("bv-modal-details");

        this.$store
          .dispatch("getModelData", { token, brandName, modelName })
          .then(() => {
            this.details = this.$store.getters.modelDataList;
            console.log(JSON.stringify(this.details));
            this.detailsLoading = false;
          });
      } catch (e) {
        console.error(e);
        this.$emit("close");
      }
    } else {
      /**
       * Hide the modal
       * Reset data
       */
      this.$bvModal.hide("bv-modal-details");
      this.details = [];
      this.detailsCurrentPage = 1;
      this.detailsLoading = true;
    }
  }
}
</script>
