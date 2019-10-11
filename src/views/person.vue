<template>
  <div class="person page">
    <div class="container">
      <button class="btn">back</button>
      <div class="card">
        <div class="headerRow">
          <div>
            <h1>Ronan Furuta</h1>
            <h2>Lick Wilmerding HS</h2>
          </div>
          <p>Attendee</p>
        </div>
        <hr>
        <div class="card--light">
          <div class="quickStats">
            <p class="card__heading">Quick Stats</p>
          </div>
          <div class="location">
            <p class="card__heading">Location</p>
          </div>
          <div class="details">
            <p class="card__heading">Summary</p>
          </div>
        </div>
        <div class="controlRow">
          <div class="card--light">
            <p class="card__heading">Allergies</p>
            <textarea name="" id=""></textarea>
            <button class="btn">Save</button>
          </div>
          <div class="card--light">
            <p class="card__heading">Notes</p>
            <textarea name="" id=""></textarea>
            <button class="btn">Save</button>
          </div>
          <div class="card--light">
            <p class="card__heading">Waivers</p>
            <button class="btn">MANUAL SUBMIT WAIVER</button>
            <button class="btn">MANUAL SUBMIT PERMISSION LETTER</button>
            <p>Use these buttons to indicate that one of their waivers  was submitted in person. Make sure to keep the waiver(s)</p>
          </div>
          <div class="buttonRow">
            <button class="btn">CHECK IN</button>
          </div>
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
