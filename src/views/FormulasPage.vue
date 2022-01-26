<template>
  <div class="container mt-3" id="formulas-form">
    <h2 class="mb-5">List of Formulas</h2>
    <FormulasList />
  </div>
</template>

<script>
import FormulasList from "../components/FormulasList.vue";

export default {
  name: "FormulasPage",
  components: {
    FormulasList,
  },
};
</script>

