<template>
  <div>
    <div>
      <h1>Список сотрудников</h1>
      <display-new-employee-form-button
        @toggleFormDisplaying="toggleFormDisplaying"
        class="mb-2"
      />
    </div>
    <employees-table v-if="employees.length"/>
    <b-modal
      v-model="isFormDisplaying"
      hide-footer
    >
      <new-employee-form @toggleFormDisplaying="toggleFormDisplaying"/>
    </b-modal>
  </div>
</template>

<script>
import {BModal} from 'bootstrap-vue'
import EmployeesTable from './EmployeesTable'
import NewEmployeeForm from './NewEmployeeForm'
import DisplayNewEmployeeFormButton from './DisplayNewEmployeeFormButton'
import Storage from '../utils/Storage'
import store from '../store'
import {computed, ref} from '@vue/composition-api'

export default {
  name: 'MainPage',
  components: {
    BModal,
    EmployeesTable,
    NewEmployeeForm,
    DisplayNewEmployeeFormButton
  },
  setup () {
    const storage = new Storage()

    window.addEventListener('unload', () => {
      storage.setItem('employees', store.getters['employees'])
      storage.setItem('employeesCount', store.getters['employeesCount'])
    })

    const isFormDisplaying = ref(false)
    const employees = computed(() => store.getters['allEmployees'])

    const toggleFormDisplaying = (value) => {
      isFormDisplaying.value = value
    }

    return {
      isFormDisplaying,
      employees,

      toggleFormDisplaying
    }
  }
}
</script>
