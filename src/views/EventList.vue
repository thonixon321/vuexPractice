<template>
  <div>
    <!-- the first user is the module name, the next is the state -->
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1}}" rel="prev">
        Prev Page
      </router-link>
    </template>
    <router-link v-if="page * perPage < event.eventLimit" :to="{ name: 'event-list', query: { page: page + 1}}" rel="next">
      Next Page
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      perPage: 3
    }
  },

  computed: {
    //when there is a module, reference that name instead of state property name
    ...mapState(['event', 'user']),

    page() {
      return parseInt(this.$route.query.page) || 1
    },

  },

  created() {
    this.$store.dispatch('event/fetchEvents', {perPage: this.perPage, page: this.page})
  }
}
</script>
