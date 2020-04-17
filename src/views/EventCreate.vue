<template>
  <div>

    <form v-if="event" @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input v-model="event.title" type="text" placeholder="Add an event title"/>
      </div>
      <div class="field">
        <label>Description</label>
        <input v-model="event.description" type="text" placeholder="Add a description"/>
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input v-model="event.location" type="text" placeholder="Add a location"/>
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <input type="text" v-model="event.date">
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit"/>
    </form>
  </div>
</template>

<script>


export default {
  data() {

    const times = []
    const categories = this.$store.state.categories

    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }

    return {
      times,
      categories,
      incrementBy: 100,
      event: this.createFreshEventObject()
    }
  },

  computed: {

  },

  methods: {
    createEvent() {
      this.$store.dispatch('event/createEvent', this.event).then(() => {
        this.$router.push({
          name: 'event-show',
          params: {id: this.event.id}
        })
        this.event = this.createFreshEventObject()
      }).catch(() => {
        //catches the throw from the module store, and doesn't clear the form or go to new route
      })
    },
    //can connect this to our local data, clear it out when needed, and
    //this keeps it separated from the vuex store
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user.name,
        category: '',
        organizer: user.name,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }

}
</script>

<style>

</style>
