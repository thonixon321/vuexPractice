<template>
  <div class="notification-container">
    <NotificationBar v-for="notification in notifications" :notification="notification" :key="notification.id"/>
  </div>
</template>

<script>
import NotificationBar from './NotificationBar'
import { mapState } from 'vuex'

export default {

computed: {
  ...mapState({
    notifications: state => state.notification.notifications
  })
},

components: {
  NotificationBar
}
}
</script>

<style scoped>

.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}

</style>