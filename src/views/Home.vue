<template>
  <main class="home page">
    <form class="searchBar" @submit.prevent>
      <input type="text" placeholder="Search for a name">
    </form>
    <div class="rosterContainer">
      <div v-for="i in 168" class="person">
        <p class="person__name">Ronan Furuta</p>
        <p class="person__role">Attendee</p>
        <p class="person__occupation">Lick-Wilmerding HS</p>

        <p class="person__checkedIn">Checked In</p>

        <p class="person__onCampus">On Campus</p>

      </div>
    </div>

  </main>
</template>

<script>
  export default {
    name: 'home',

  }
</script>
