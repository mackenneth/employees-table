<template>
  <b-button
    @click="$emit('toggleFormDisplaying', true)"
    variant="primary"
  >
    Добавить сотрудника
  </b-button>
</template>

<script>
import {BButton} from 'bootstrap-vue'

export default {
  name: 'DisplayNewEmployeeFormButton',
  components: {
    BButton
  }
}
</script>
