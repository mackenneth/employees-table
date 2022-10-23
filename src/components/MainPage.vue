<template>
  <div>
    <employees-table/>
    <new-employee-form/>
  </div>
</template>

<script>
import EmployeesTable from './EmployeesTable'
import NewEmployeeForm from './NewEmployeeForm'

export default {
  name: 'MainPage',
  components: {
    EmployeesTable,
    NewEmployeeForm
  }
}
</script>
