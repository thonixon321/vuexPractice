<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p> {{ notification.message }} </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      timeout: null
    }
  },

  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },

  methods: {
    ...mapActions({
      delete: 'notification/remove'
    })
  },

  mounted() {
    this.timeout = setTimeout( () => {
      this.delete(this.notification)
    }, 3000)
  },

  beforeDestroy() {
    //if trying to close component before timeout ends, fire this
    //to avoid a memory leak
    clearTimeout(this.timeout)
  }

}
</script>

<style scoped>
  .notification-bar {
    margin: 1em 0 1em
  }


</style>