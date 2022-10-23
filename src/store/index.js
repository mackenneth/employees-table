import Vuex from 'vuex'
import Vue from 'vue'
import {getAllEmployees, getDataForAddingNewEmployee, getSortedEmployees} from '../utils/helpers'
import Storage from '../utils/Storage'

const storage = new Storage()

Vue.use(Vuex)

const store = new Vuex.Store({
  state () {
    return {
      employees: storage.getItem('employees') || [],
      employeesCount: storage.getItem('employeesCount') || 0
    }
  },
  getters: {
    employeesCount: state => state.employeesCount,
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
    },
    sortEmployees (state) {
      state.employees = getSortedEmployees(state.employees)
    }
  }
})

export default store
