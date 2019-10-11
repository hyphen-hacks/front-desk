<template>
  <div class="person page">
    <div class="container">
      <router-link to="/" class="back btn">back</router-link>
      <div class="card">
        <div class="headerRow">
          <div>
            <h1>Ronan Furuta</h1>
            <h2>Lick Wilmerding HS</h2>
          </div>
          <p>Attendee</p>
        </div>
        <hr>
        <div class="card--light quickInfo">
          <div class="quickStats">
            <p class="card__heading">Quick Stats</p>
            <p class="status">OK</p>
          </div>
          <div class="location">
            <p class="card__heading">Location</p>
            <p class="stat">Checked In: <span>true</span></p>
            <p class="stat">On Campus: <span>true</span></p>
          </div>
          <div class="details">
            <p class="card__heading">Summary</p>
            <p class="stat">Waiver Status: <span>Accepted</span></p>
            <p class="stat">Permission: <span>Non Applicable</span></p>
            <p class="stat">Allergies: <span>None</span></p>
            <p class="stat">Random Notes: <span>None</span></p>
          </div>
        </div>
        <div class="controlRow">
          <div class="card--light">
            <p class="card__heading">Allergies</p>
            <textarea class="input" name="" id=""></textarea>
            <button class="btn">Save</button>
          </div>
          <div class="card--light">
            <p class="card__heading">Notes</p>
            <textarea class="input" name="" id=""></textarea>
            <button class="btn">Save</button>
          </div>
          <div class="card--light overrides">
            <p class="card__heading">Waivers</p>
            <button class="btn">MANUAL SUBMIT WAIVER</button>
            <button class="btn large">MANUAL SUBMIT PERMISSION LETTER</button>
            <p class="info">Use these buttons to indicate that one of their waivers was submitted in person. Make sure to keep the
              waiver(s)</p>
          </div>

        </div>
        <div class="buttonRow">
          <button class="btn">CHECK IN</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "person"
  }
</script>
