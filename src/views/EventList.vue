<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1}}" rel="prev">
        Prev Page
      </router-link>
    </template>
    <router-link v-if="page * 3 < eventLimit" :to="{ name: 'event-list', query: { page: page + 1}}" rel="next">
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

    }
  },

  computed: {
    ...mapState(['events', 'eventLimit']),

    page() {
      return parseInt(this.$route.query.page) || 1
    },

  },

  created() {
    this.$store.dispatch('fetchEvents', {perPage: 3, page: this.page})
  }
}
</script>
