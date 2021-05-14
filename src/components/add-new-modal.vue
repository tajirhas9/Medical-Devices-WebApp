<template>
  <b-modal
    centered
    hide-footer
    size="xl"
    class="text-center"
    id="bv-modal-add-new"
    @hidden="closeModal"
  >
    <b-container>
      <b-row align-h="center" class="text-center">
        <p style="font-weight: bold; font-size: 20px">Add New Device</p>
      </b-row>
      <b-row
        class="bv-example-row"
        align-h="center"
        align-v="center"
        v-if="loading"
      >
        <b-row align-h="center" align-v="center">
          <b-spinner></b-spinner>
        </b-row>
        <b-row align-h="center" align-v="center">
          <strong>Loading...</strong>
        </b-row>
      </b-row>

      <!--
        Form
      -->
      <b-row>
        <b-row style="padding: 30px">
          <label for="brand-id">Brand Id:</label>
          <b-form-input
            id="brand-id"
            v-model="brandId"
            placeholder="Enter Brand Id"
            trim
          ></b-form-input>
        </b-row>
        <b-row style="padding: 30px; padding-top: 0px">
          <label for="name">Name:</label>
          <b-form-input
            id="name"
            v-model="name"
            placeholder="Enter Name"
            trim
          ></b-form-input>
        </b-row>
        <b-row style="padding: 30px; padding-top: 0px">
          <label for="comment">Comment:</label>
          <b-form-input
            id="comment"
            v-model="comment"
            placeholder="Enter Comment"
            trim
          ></b-form-input>
        </b-row>
      </b-row>

      <b-row v-if="showError">
        <b-alert show variant="danger"
          >Failed to Add new Device. Try again</b-alert
        >
      </b-row>

      <!--
        Buttons
      -->
      <b-row>
        <b-button variant="primary" class="mt-3" block @click="addNew"
          >Add</b-button
        >
      </b-row>

      <b-row>
        <b-button variant="secondary" class="mt-3" block @click="closeModal"
          >Close</b-button
        >
      </b-row>
    </b-container>
  </b-modal>
</template>

<script lang="ts">
import { AModelData, AModelType } from "@/store/modules/device-store";
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class AddNewModal extends Vue {
  @Prop() private show!: boolean;

  // Data
  loadingStatus = false;
  brandId = "";
  name = "";
  comment = "";
  error = false;

  // Computed values
  get loading() {
    return this.loadingStatus;
  }

  set loading(status) {
    this.loadingStatus = status;
  }

  get showError() {
    return this.error;
  }

  set showError(status) {
    this.error = status;
  }

  // Methods

  closeModal() {
    this.$emit("close");
  }

  addNew() {
    /**
     * dispatch action to vuex store to add new device
     * on success ->
     *    - emit success
     *    - reset data
     *    - close modal
     */
    this.loading = true;

    const token = this.$store.getters.userToken;
    const BrandId = this.brandId;
    const Name = this.name;
    const Comment = this.comment;
    this.$store
      .dispatch("addNewDevice", { token, BrandId, Name, Comment })
      .then(() => {
        this.loading = false;
        this.$emit("success");
        this.brandId = "";
        this.name = "";
        this.comment = "";
        this.error = false;
        this.closeModal();
      })
      .catch((e) => {
        this.loading = false;
        this.showError = true;
      });
  }

  // Watchers
  @Watch("show")
  OnShowChange(val: boolean, oldVal: boolean) {
    /**
     * This method keeps track of the show variable
     * and decides whether to show or hide the modal
     */
    console.log("value of show: " + this.show);
    if (val) {
      this.$bvModal.show("bv-modal-add-new");
    } else {
      this.$bvModal.hide("bv-modal-add-new");
    }
  }
}
</script>
