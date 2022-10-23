<template>
  <b-table-simple
    striped
    bordered
    hover
    responsive
    small
    :itemes="employees"
  >
    <b-thead>
      <b-th>
        Имя
      </b-th>
      <b-th>
        Телефон
      </b-th>
    </b-thead>
    <b-tbody>
      <b-tr
        v-for="(employee, index) in employees"
        :key="index"
      >
        <b-td class="text-start">
          <template v-for="item in employee.nestingLevel">
            -
          </template>
          {{ employee.firstName }}
        </b-td>
        <b-td>
          {{ employee.phoneNumber }}
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { BTableSimple, BThead, BTbody, BTd, BTr, BTh } from 'bootstrap-vue'

export default {
  name: 'EmployeesTable',
  components: {
    BTableSimple,
    BThead,
    BTbody,
    BTd,
    BTr,
    BTh
  },
  props: {
    employees: {
      type: Array,
      required: true,
      default: () => ([])
    }
  },
}
</script>
