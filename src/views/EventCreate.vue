<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p> this was id: {{ user.id }}</p>
    <ul>
      <li v-for="(cat, i) in categories" :key="i">
        {{ cat }}
      </li>
    </ul>
    <p>There are {{ catLength }} categories </p>
    <p>Here is an event by id and it's title: {{ getEventById(1).title }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'


export default {
  computed: {
    ...mapState(['user', 'categories']),

    ...mapGetters(['catLength', 'getEventById'])

  }

}
</script>

<style>

</style>
