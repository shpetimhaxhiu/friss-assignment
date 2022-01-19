<template>
  <div class="container mt-3" id="formulas-form">
    <h2 class="mb-5">List of Formulas</h2>
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
          <tr
            v-bind:formulas="formulas"
            v-for="formula in formulas"
            :key="formula.id"
          >
            <td>{{ formula.makeName }}</td>
            <td>{{ formula.modelName }}</td>
            <td>{{ formula.yearComparisonType }} {{ formula.year }}</td>
            <td>{{ formula.fuelType }}</td>
            <td><span class="badge" v-bind:class="riskClass(formula.risk)">{{ formula.risk }}</span></td>
            <td>
              <button type="button" class="btn btn-sm btn-danger">
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
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "FormulasList",
  data() {
    return {
      formulas: [],
    };
  },
  created() {
    axios.get("http://localhost:3000/formulas/").then((response) => {
      console.log(response.data);
      this.formulas = response.data;
    });
  },
  methods: {
      riskClass(value){
          if(value === "high") {
              return 'bg-danger';
          }
          else if(value === "medium") {
              return 'bg-warning';
          }
          else {
              return 'bg-info';
          }
      }
  }
};
</script>
