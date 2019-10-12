<template>
  <div class="person page">
    <loading v-if="loading"></loading>
    <div class="container">
      <router-link to="/" class="back btn">back</router-link>
      <div v-if="person" class="card">
        <div class="headerRow">
          <div>
            <h1>{{person.name}}</h1>
            <h2>{{occupation}}</h2>
          </div>
          <p>{{role}}</p>
        </div>
        <hr>
        <div class="card--light quickInfo">
          <div class="quickStats">
            <p class="card__heading">Quick Stats</p>
            <p class="status"><span v-if="!flagged" class="green">OK</span><span v-if="flagged" class="red">FLAG</span>
            </p>
          </div>
          <div class="location">
            <p class="card__heading">Location</p>
            <p class="stat">Checked In: <span>{{person.checkedIn}}</span></p>
            <p class="stat">On Campus: <span>{{person.onCampus}}</span></p>
          </div>
          <div class="details">
            <p class="card__heading">Summary</p>
            <p class="stat">Waiver Status: <span :class="{red: !waiverGood, green: waiverGood}">{{waiverText}}</span>
            </p>
            <p class="stat">Permission: <span :class="{red: !permissionGood.status, green: permissionGood.status}">{{permissionGood.text}}</span>
            </p>
            <p class="stat">Allergies: <span :class="{red: alergieFlag, green: !alergieFlag}">{{alergieFlag}}</span></p>
            <p class="stat">Notes: <span class="red" v-if="person.notes">SEE BELOW</span> <span class="green"
                                                                                                v-if="!person.notes">none</span>
            </p>
          </div>
        </div>
        <div class="controlRow">
          <div class="card--light">
            <p class="card__heading">Allergies</p>
            <textarea v-model="person.answers[5].answer" class="input" name="" id="allergies"></textarea>
            <button @click="saveAllergies" class="btn">Save</button>
          </div>
          <div class="card--light">
            <p class="card__heading">Notes</p>
            <textarea v-model="person.notes" class="input" name="" id="notes"></textarea>
            <button @click="saveNotes" class="btn">Save</button>
          </div>
          <div class="card--light overrides">
            <p class="card__heading">Waivers</p>
            <button @click="submitWaiver" :class="{grey: waiverGood}" class="btn">{{waiverBTNText}}
            </button>
            <button @click="submitPermissionLetter"
                    :class="{grey: permissionGood.status}" class="btn large">{{permissionBTNText}}
            </button>
            <p class="info">Use these buttons to indicate that one of their waivers was submitted in person. Make sure
              to keep the
              waiver(s)</p>
          </div>

        </div>
        <div class="buttonRow">
          <button v-if="!person.checkedIn" @click="checkIn" class="btn">CHECK IN</button>
          <button v-if="person.checkedIn" @click="checkOut" class="btn grey">CHECK OUT</button>
          <button v-if="person.checkedIn" @click="toggleCampus" class="btn">{{onCampusText}}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import loading from '../components/loading'

  export default {
    name: "person",
    components: {loading},
    data() {
      return {
        personStorage: false,
        lickDefinitions: [],
        loading: true
      }
    },

    computed: {

      person: {
        get() {
          return this.personStorage
        },
        set(val) {
          return this.personStorage = val
        }
      },
      onCampusText() {
        if (this.person.onCampus) {
          return 'Mark Off Campus'
        } else {
          return 'Mark On Campus'
        }
      },
      alergieFlag() {
        return this.person.answers[5].answer !== 'None'
      },
      waiverGood() {
        return this.person.waiverStatus === 2
      },
      waiverBTNText() {
        if (this.waiverGood) {
          return 'UN-SUBMIT WAIVER'
        } else {
          return 'MANUAL SUBMIT WAIVER'
        }
      },
      waiverText() {

        switch (this.person.waiverStatus) {
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

      occupation() {
        const person = this.person
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
      role() {
        const person = this.person
        //console.log(person.ticket_class_name)
        if (person.ticket_class_name === 'High school Student') {
          return 'Attendee'
        } else if (person.ticket_class_name === 'Mentor/Judge') {
          return 'Mentor/Judge'
        } else {
          return 'Volunteer'
        }
      },
      permissionGood() {
        if (this.role === 'Attendee') {
          if (this.lickDefinitions) {

            if (this.lickDefinitions.synonyms.indexOf(this.occupation.toLowerCase()) > -1 || this.occupation.toLowerCase().indexOf('lick') > -1) {
              if (this.person.lickWaiver) {
                return {
                  status: true,
                  text: 'Submitted'
                }
              } else {
                return {
                  status: false,
                  text: 'Not Submitted'
                }
              }
            } else {
              return {
                status: true,
                text: 'Non Applicable'
              }
            }


          } else {
            return {
              status: false,
              text: 'loading'
            }
          }
        } else {
          return {
            status: true,
            text: 'Non Applicable'
          }
        }


      },
      permissionBTNText() {
        if (this.permissionGood.status) {
          return 'UN-SUBMIT PERMISSION SLIP'
        } else {
          return 'MANUAL SUBMIT PERMISSION SLIP'
        }
      },
      flagged() {
        console.log(this.permissionGood.status, this.waiverGood, !this.alergieFlag)
        if (this.permissionGood.status && this.waiverGood && !this.alergieFlag && !this.person.notes) {
          return false
        } else {
          return true
        }
      }
    },

    created() {
      this.$firebase.firestore().collection('secrets').doc('lickSynonyms').get().then(snap => {
        this.lickDefinitions = snap.data()
      })
      this.$firebase.firestore().collection('people').doc(this.$route.params.id).get().then(i => {
        if (i.exists) {
          this.person = i.data()
          this.loading = false
        } else {
          this.$router.push('/')
        }

      })
    },
    methods: {
      checkOut() {
        this.$swal({
          title: "Are you sure?",
          text: "You should only check someone out if you made a mistake in checking them in. THIS WILL ALSO MARK THEM AS OFF CAMPUS. IF YOU NEED TO MAKE MORE NUANCED CHANGES USE THE DASHBOARD We use checkin as a record of how many people actually came on campus at one point.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.$firebase.firestore().collection('people').doc(this.person.id).update({
              checkedIn: false, onCampus: false
            }).then(i => {
              this.person.checkedIn = false;
              this.person.onCampus = false;
            })
          }


        });
      },
      saveNotes() {
        this.$firebase.firestore().collection('people').doc(this.person.id).update({
          notes: this.person.notes
        })
      },
      saveAllergies() {
        this.$firebase.firestore().collection('people').doc(this.person.id).update({
          answers: this.person.answers
        })
      },
      toggleCampus() {
        this.$firebase.firestore().collection('people').doc(this.person.id).update({
          onCampus: !this.person.onCampus
        }).then(i => {
          this.person.onCampus = !this.person.onCampus
        })

      },
      checkIn() {
        this.$firebase.firestore().collection('people').doc(this.person.id).update({
          checkedIn: true, onCampus: true
        }).then(i => {
          this.person.checkedIn = true;
          this.person.onCampus = true;
        })
      },
      submitWaiver() {

        if (this.person.waiverStatus != 2) {
          this.person.legacyWaiverStatus = this.person.waiverStatus
          this.person.waiverStatus = 2;
          this.$firebase.firestore().collection('people').doc(this.person.id).update({
            waiverStatus: 2, legacyWaiverStatus: this.person.legacyWaiverStatus
          }).then(i => {
            console.log('updated')
          })
        } else {
          if (!this.person.legacyWaiverStatus) {
            this.person.legacyWaiverStatus = 0
          }
          this.$firebase.firestore().collection('people').doc(this.person.id).update({waiverStatus: this.person.legacyWaiverStatus}).then(i => {
            this.person.waiverStatus = this.person.legacyWaiverStatus;
          }).then(i => {
            console.log('updated')
          })
        }

      },
      submitPermissionLetter() {
        console.log('got request to update permission letter')
        this.person.lickWaiver = !this.person.lickWaiver;
        console.log(this.person.lickWaiver)
        this.$firebase.firestore().collection('people').doc(this.person.id).update({lickWaiver: this.person.lickWaiver}).then(i => {
          console.log('updated')
        })

      }
    },
  }
</script>
