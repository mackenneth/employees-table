import Vuex from 'vuex'
import Vue from 'vue'
import {getAllEmployees, getDataForAddingNewEmployee} from '../helpers/helpers'

Vue.use(Vuex)

const store = new Vuex.Store({
  state () {
    return {
      employees: [],
      employeesCount: 0
    }
  },
  getters: {
    employees: state => state.employees,
    allEmployees: state => getAllEmployees(state.employees, [])
  },
  mutations: {
    addNewEmployee (state, employee) {
      state.employeesCount += 1
      employee.id = state.employeesCount
      const {supervisor, nestingLevel} = getDataForAddingNewEmployee(employee.supervisorId, state.employees)
      if (supervisor) {
        employee.nestingLevel = nestingLevel
        supervisor.employees.push(employee)
      } else {
        state.employees.push(employee)
      }
    }
  }
})

export default store
