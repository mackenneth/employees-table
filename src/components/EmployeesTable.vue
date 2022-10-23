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
      <b-th
        @click="$store.commit('sortEmployees')"
        :class="{'cursor-pointer': employees.length}"
        v-b-tooltip
        :title="employees.length > 1 ? 'Сортировать по алфавиту' : ''"
      >
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
import {BTableSimple, BThead, BTbody, BTd, BTr, BTh, VBTooltip} from 'bootstrap-vue'
import {computed} from '@vue/composition-api'
import store from '../store'

export default {
  name: 'EmployeesTable',
  directives: {
    'b-tooltip': VBTooltip
  },
  components: {
    BTableSimple,
    BThead,
    BTbody,
    BTd,
    BTr,
    BTh
  },
  setup () {
    const employees = computed(() => store.getters['allEmployees'])

    return {
      employees
    }
  }
}
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
