<script setup>
import { reactive } from 'vue';

const formInitState = {
  code: '',
  firstName: '',
  lastName: '',
};
const additionForm = reactive({ ...formInitState });
</script>

<template>
  <div class="main">
    <div class="rsprd-bar">
      <h2 class="rsprd-bar__title">Add Teacher</h2>
    </div>
    <hr class="rsprd-bar__separator" />
    <div class="rsprd-body">
      <div class="rsprd-body__form">
        <div class="input-container">
          <label for="code">Teachers code</label>
          <input
            v-model="additionForm.code"
            id="code"
            class="rsprd-body__input"
            type="text"
            placeholder="Enter teachers code..."
            required
          />
        </div>
        <div class="input-container">
          <label for="fname">First name</label>
          <input
            v-model="additionForm.firstName"
            id="fname"
            class="rsprd-body__input"
            type="text"
            placeholder="Enter first name..."
            required
          />
        </div>
        <div class="input-container">
          <label for="lname">Last name</label>
          <input
            v-model="additionForm.lastName"
            id="lname"
            class="rsprd-body__input"
            type="text"
            placeholder="Enter last name here..."
            required
          />
        </div>
        <button class="rsprd-button rsprd-button--cta">Add</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: var(--color-lighter);
  border-radius: 20px;
  margin: 0 auto 80px;
  padding: 20px;
  width: 70%;
}

.rsprd-body {
  display: flex;
  height: 250px;
}

.rsprd-body__form {
  padding: 16px;
  position: relative;
  width: 50%;
}

.input-container {
  margin: 24px 0;
}

.rsprd-body__input {
  border: none;
  border-bottom: 1px solid black;
  color: var(--color-muted);
  font-size: 1rem;
  margin-top: 5px;
  width: 100%;
}

.rsprd-body__input:focus {
  border-bottom: 1px solid black;
  outline: none;
}

.rsprd-body__input:focus::placeholder {
  color: transparent;
}

.rsprd-button {
  bottom: 0;
  height: 30px;
  padding: 5px 20px;
  position: absolute;
  width: 25%;
}
</style>
