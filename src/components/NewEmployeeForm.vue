<template>
  <div class="new-employee-form">
    <h2 class="mb-1">Добавление пользователя</h2>
    <b-form-group
      label="Имя"
      class="mb-1"
    >
      <b-form-input
        v-model.trim="employee.firstName"
        type="text"
      />
    </b-form-group>
    <b-form-group
      label="Телефон"
      class="mb-1"
    >
      <b-form-input
        v-model.trim="employee.phoneNumber"
        type="text"
      />
    </b-form-group>
    <b-form-group
      label="Руководитель"
      class="mb-1"
    >
      <b-form-select v-model="employee.supervisorId" :options="employeesForSelect"/>
    </b-form-group>
    <b-button
      variant="primary"
      size="sm"
      block
      class="w-100"
      @click="addNewEmployee"
    >
      Сохранить
    </b-button>
  </div>
</template>

<script>
import { BFormInput, BFormSelect, BButton, BFormGroup, BForm } from 'bootstrap-vue'
import {computed, ref} from '@vue/composition-api'

export default {
  name: 'NewEmployeeForm',
  components: {
    BFormInput,
    BFormSelect,
    BButton,
    BFormGroup,
    BForm
  },
  props: {
    employees: {
      type: Array
    }
  },
  setup (props, { emit }) {
    const getDefaultEmployee = () => {
      return {
        firstName: '',
        phoneNumber: '',
        supervisorId: null,
        id: null,
        nestingLevel: 1,
        employees: []
      }
    }

    const nullOption = {value: null, text: 'Не выбрано'}

    const employee = ref(getDefaultEmployee())

    const addNewEmployee = () => {
      emit('addNewEmployee', employee.value)
      employee.value = getDefaultEmployee()
    }

    const employeesForSelect = computed(() => {
      const employeesForDisplaying = props.employees.map(employee => {
        return {
          value: employee.id,
          text: `${employee.firstName} ${employee.phoneNumber}`
        }
      })

      return [nullOption, ...employeesForDisplaying]
    })
    return {
      employee,
      employeesForSelect,
      addNewEmployee
    }
  }
}
</script>

<style>
.new-employee-form {
  max-width: 500px;
  padding: 1rem;
}
</style>
