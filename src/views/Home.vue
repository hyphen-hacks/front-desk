<template>
  <main class="home page">
    <loading v-if="loading"></loading>
    <form class="searchBar" @submit.prevent>
      <input v-model="search" type="text" placeholder="Search for a name">
    </form>

    <div class="rosterContainer">
      <router-link :to="`/person/${person.id}`" v-for="person in filteredRoster" class="person">
        <p class="person__name">{{person.name}}</p>
        <p class="person__role">{{role(person)}}</p>
        <p class="person__occupation">{{occupation(person)}}</p>

        <p v-if="person.checkedIn" class="person__checkedIn">Checked In</p>
        <p v-if="!person.checkedIn" class="person__checkedIn"></p>

        <p v-if="person.onCampus" class="person__onCampus">On Campus</p>
        <p v-if="!person.onCampus" class="person__onCampus"></p>

      </router-link>
    </div>

  </main>
</template>

<script>
  import loading from '../components/loading'

  export default {
    name: 'home',
    components: {loading},
    data() {
      return {
        people: [],
        search: "",
        loading: false,

      }
    },
    computed: {
      filteredRoster() {
        return this.$parent.roster.filter((person) => {
          return person.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        })
      }
    },
    methods: {
      occupation(person) {
        // console.log(person.ticket_class_name)
        if (person.ticket_class_name === 'High school Student') {
          //console.log(person.answers[1].answer)
          return person.answers[1].answer
        } else if (person.ticket_class_name === 'Mentor/Judge') {
          return person.answers[15].answer
        } else {
          return 'na'
        }
      },
      waiverStatus(id) {
        switch (id) {
          case 0:
            return 'None'
          case 1:
            return 'Submitted'
          case 2:
            return 'Accepted'
          case 3:
            return 'Declined'

        }
      },
      role(person) {
        //console.log(person.ticket_class_name)
        if (person.ticket_class_name === 'High school Student') {
          return 'Attendee'
        } else if (person.ticket_class_name === 'Mentor/Judge') {
          return 'Mentor/Judge'
        } else {
          return 'Volunteer'
        }
      }
    },
    created() {


    }

  }
</script>
