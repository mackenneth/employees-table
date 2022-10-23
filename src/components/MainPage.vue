<template>
  <div>
    <employees-table/>
    <new-employee-form/>
  </div>
</template>

<script>
import EmployeesTable from './EmployeesTable'
import NewEmployeeForm from './NewEmployeeForm'
import Storage from '../utils/Storage'
import store from '../store'

export default {
  name: 'MainPage',
  components: {
    EmployeesTable,
    NewEmployeeForm
  },
  setup () {
    const storage = new Storage()

    window.addEventListener('unload', () => {
      storage.setItem('employees', store.getters['employees'])
      storage.setItem('employeesCount', store.getters['employeesCount'])
    })
  }
}
</script>
