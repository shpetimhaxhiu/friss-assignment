<template>
  <div class="container mt-3" id="formulas-form">
    <h2 class="mb-5">Create new Formula</h2>
    <FormulaForm />
  </div>
</template>

<script>
import FormulaForm from '../components/FormulaForm.vue';

export default {
    name: 'CreatePage',
    components: {
      FormulaForm,
    }
};
</script>

