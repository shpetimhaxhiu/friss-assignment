<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Make Name</th>
          <th>Model Name</th>
          <th>Year Comparison</th>
          <th>Fuel Type</th>
          <th colspan="2">Risk</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="formula in allFormulas" :key="formula.id">
          <td>
            {{ formula.makeName === "" ? "Any Make" : formula.makeName }}
          </td>
          <td>
            {{ formula.modelName === "" ? "Any Model" : formula.modelName }}
          </td>
          <td>
            {{
              formula.yearComparisonType === false || formula.year === false
                ? "Any Year"
                : formula.yearComparisonType + " " + formula.year
            }}
          </td>
          <td>
            <span v-if="formula.fuelType.length === 0"> Any fuel type </span>
            <span v-else>
              <span v-for="(ft, index) in formula.fuelType" :key="index">
                {{ ft }}<br />
              </span>
            </span>
          </td>
          <td>
            <span class="badge" :class="riskClass(formula.risk)">{{
              formula.risk
            }}</span>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="confirmDelete(formula.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <h3 class="text-center">No data to show</h3> -->
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FormulasList",
  methods: {
    ...mapActions(["fetchFormulas", "deleteFormula"]),
    riskClass(value) {
      if (value === "high") {
        return "bg-danger";
      } else if (value === "medium") {
        return "bg-warning";
      } else {
        return "bg-info";
      }
    },
    confirmDelete(id) {
      this.$bvModal
        .msgBoxConfirm("Do you really want to delete this rule?", {
          title: "Please Confirm",
          okVariant: "danger",
          hideHeaderClose: true,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.deleteFormula(id);
          }
        })
        .catch(this.handleErrors);
    },
  },
  computed: mapGetters(["allFormulas"]),
  created() {
    this.fetchFormulas();
  },
};
</script>
