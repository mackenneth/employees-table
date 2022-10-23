export const getDataForAddingNewEmployee = (supervisorId, employees, nestingLevel = 1) => {
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

export const getAllEmployees = (employees, accumulator) => {
  if (employees.length) {
    employees.forEach(employee => {
      accumulator.push(employee)
      if (employee.employees.length) {
        accumulator = getAllEmployees(employee.employees, accumulator)
      }
    })
  }
  return accumulator
}
