<template>
  <form @submit.prevent @submit="checkForm">
    <div class="mb-3 row">
      <p class="col-8">
        Use the form below to a create new risk calculation and categorization
        based on vehicle parameters.
        <span>Please note that you must select at least one parameter!</span>
        <b-alert
          :show="dismissCountDown"
          variant="danger"
          class="mt-4"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
          You must select at least one parameter!
        </b-alert>
        <b-alert
          :show="dismissCountDownSuccess"
          dissmissable
          variant="success"
          class="mt-4"
          @dismissed="dismissCountDownSuccess = 0"
          @dismiss-count-down="2"
        >
          Your rule has been created!
        </b-alert>
      </p>
    </div>
    <div class="mb-3 row">
      <label for="selectedMake" class="form-label col-sm-2 col-form-label"
        >Make Name</label
      >
      <div class="col-sm-6">
        <select
          v-model="selectedMake"
          class="form-select"
          @change="selectMake($event)"
          id="selectedMake"
        >
          <option selected="selected" value="0">Any make</option>
          <option
            v-for="make in allMakes"
            :key="make.MakeId"
            :value="make.MakeId"
          >
            {{ make.MakeName }}
          </option>
        </select>
        <div id="selectedMake" class="form-text">
          Select vehicle manufacturer name.
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="selectedModel" class="form-label col-sm-2 col-form-label"
        >Model Name</label
      >
      <div class="col-sm-6">
        <select
          v-model="selectedModel"
          class="form-select"
          aria-label="Default select example"
          @change="selectModel($event)"
          id="selectedModel"
        >
          <option selected="selected" value="0">Any model</option>
          <option
            v-for="model in allModels"
            :key="model.Model_ID"
            :value="model.Model_ID"
          >
            {{ model.Model_Name }}
          </option>
        </select>
        <div id="selectedModel" class="form-text">
          Select vehicle model name.
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="year" class="form-label col-sm-2 col-form-label"
        >Production Year</label
      >
      <div class="col-sm-6">
        <div class="input-group d-flex">
          <select
            class="form-select flex-grow-1"
            aria-label="Default select example"
            style="width: 30%"
            v-model="comparisonType"
          >
            <option value="0">Any Comparison Type</option>
            <option value=">">&#62; (Greater then)</option>
            <option value="<">&#60; (Less Than)</option>
            <option value="=">&#61; (Equal to)</option>
          </select>
          <select class="form-control" v-model="year" id="year">
            <option value="0">Any Year</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          <!-- <input type="number" min="1900" max="2099" step="1" value="2016" /> -->
        </div>
        <div id="emailHelp" class="form-text">
          Select vehicle production year and comparison type.
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label for="fuelType" class="form-label col-sm-2 col-form-label"
        >Fuel Type</label
      >
      <div class="col-sm-3">
        <div class="form-check">
          <input
            v-model="fuelType"
            class="form-check-input"
            type="checkbox"
            value="diesel"
            id="diesel"
          />
          <label class="form-check-label" for="diesel"> Diesel </label>
        </div>
        <div class="form-check">
          <input
            v-model="fuelType"
            class="form-check-input"
            type="checkbox"
            value="petrol"
            id="petrol"
          />
          <label class="form-check-label" for="petrol"> Petrol </label>
        </div>
        <div class="form-check">
          <input
            v-model="fuelType"
            class="form-check-input"
            type="checkbox"
            value="electric"
            id="electric"
          />
          <label class="form-check-label" for="electric"> Electric </label>
        </div>
      </div>
    </div>

    <div class="mb-3 row">
      <label for="risk" class="form-label col-sm-2 col-form-label">Risk</label>
      <div class="col-sm-6">
        <div class="form-check">
          <input
            v-model="risk"
            class="form-check-input"
            type="radio"
            name="low"
            id="low"
            value="low"
          />
          <label class="form-check-label" for="low"> Low </label>
        </div>
        <div class="form-check">
          <input
            v-model="risk"
            class="form-check-input"
            type="radio"
            name="medium"
            id="medium"
            value="medium"
          />
          <label class="form-check-label" for="medium"> Medium </label>
        </div>
        <div class="form-check">
          <input
            v-model="risk"
            class="form-check-input"
            type="radio"
            name="high"
            id="high"
            value="high"
          />
          <label class="form-check-label" for="high"> High </label>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Create</button>
  </form>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FormulaForm",
  methods: {
    ...mapActions(["addFormula", "fetchMakes", "fetchModels"]),
    // alerts methods
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    showSuccess() {
      this.dismissCountDownSuccess = this.dismissSecs;
    },
    selectMake(event) {
      // taking the name from option
      this.selectedMakeName =
        event.target.options[event.target.options.selectedIndex].innerText;
      // getting the value from option
      this.selectedMake = event.target.value;

      // feth models based on make
      this.fetchModels(this.selectedMake);

      // reset model selection
      this.selectedModel = "0";
    },
    selectModel(event) {
      this.selectedModelName =
        event.target.options[event.target.options.selectedIndex].innerText;
      this.selectedModel = event.target.value;
    },
    // validating form
    checkForm() {
      if (
        this.selectedMake === "0" &&
        this.selectedModel === "0" &&
        this.year === 0 &&
        this.fuelType.length === 0
      ) {
        this.formError = true;
        this.showAlert();
      } else {
        this.formError = false;
        this.submitForm();
        this.showSuccess();
      }
    },
    // submiting form
    submitForm() {
      this.addFormula({
        makeName: this.selectedMakeName != "0" ? this.selectedMakeName : "",
        modelName: this.selectedModelName != "0" ? this.selectedModelName : "",
        yearComparisonType:
          this.comparisonType != "0" && this.year != "0"
            ? this.comparisonType
            : false,
        year: this.year != "0" ? this.year : false,
        fuelType: this.fuelType,
        risk: this.risk,
      });

      this.resetForm();
    },
    resetForm() {
      this.formError = false;
      this.selectedMake = "0";
      this.selectedMakeName = "0";
      this.selectedModel = "0";
      this.selectedModelName = "0";
      this.comparisonType = "0";
      this.year = 0;
      this.fuelType = [];
      this.risk = "medium";
    },
  },
  data() {
    return {
      formError: false,

      selectedMake: "0",
      selectedMakeName: "",
      selectedModel: "0",
      selectedModelName: "",
      comparisonType: "0",
      year: 0,
      fuelType: [],
      risk: "medium",
      dismissSecs: 3,
      dismissCountDown: 0,
      dismissCountDownSuccess: 0,
    };
  },
  created() {
    this.fetchMakes();
  },

  computed: {
    ...mapGetters(["allModels", "allMakes"]),
    years() {
      // create last 100 years array
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1900 },
        (value, index) => 1901 + index
      ).reverse();
    },
  },
};
</script>
