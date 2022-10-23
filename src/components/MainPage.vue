<template>
  <div>
    <employees-table :employees="employeesForTable"/>
    <new-employee-form
      :employees="employeesForTable"
      @addNewEmployee="addNewEmployee"
    />
  </div>
</template>

<script>
import EmployeesTable from './EmployeesTable'
import NewEmployeeForm from './NewEmployeeForm'
import {computed, ref} from '@vue/composition-api'

export default {
  name: 'MainPage',
  components: {
    EmployeesTable,
    NewEmployeeForm
  },
  props: {},
  setup () {
    const employees = ref([])

    const employeesCount = ref(0)

    const getEmployeesForTable = (employees, accumulator) => {
      if (employees.length) {
        employees.forEach(employee => {
          accumulator.push(employee)
          if (employee.employees.length) {
            accumulator = getEmployeesForTable(employee.employees, accumulator)
          }
        })
      }
      return accumulator
    }

    const employeesForTable = computed(() => {
      return getEmployeesForTable(employees.value, [])
    })

    const getDataForAddingNewEmployee = (supervisorId, employees, nestingLevel = 1) => {
      let supervisor = null
      if (supervisorId !== null && employees.length) {
        nestingLevel += 1
        employees.forEach(employee => {
          if (employee.id === supervisorId) {
            supervisor = employee
          } else if (employee.employees.length) {
            const result = getDataForAddingNewEmployee(supervisorId, employee.employees, nestingLevel)
            supervisor = result.supervisor
            nestingLevel = result.nestingLevel
          } else {
            return employee
          }
        })
      }
      return {supervisor, nestingLevel}
    }

    const addNewEmployee = (employee) => {
      employeesCount.value += 1
      employee.id = employeesCount.value
      const {supervisor, nestingLevel} = getDataForAddingNewEmployee(employee.supervisorId, employees.value)
      if (supervisor) {
        employee.nestingLevel = nestingLevel
        supervisor.employees.push(employee)
      } else {
        employees.value.push(employee)
      }
    }

    return {
      employees,
      employeesCount,
      employeesForTable,
      addNewEmployee
    }
  }
}
</script>
