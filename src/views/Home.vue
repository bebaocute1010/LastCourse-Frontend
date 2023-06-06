<template>
  <div>
    <main class="container">
      <nav class="d-flex justify-space-between">
        <img src="/favicon.ico" alt="logo">
        <ul class="d-flex">
          <li>
            <router-link to="/login">Login</router-link>
          </li>
          <li>
            <router-link to="/register">Register</router-link>
          </li>
        </ul>
      </nav>
    </main>
  </div>
</template>
<style>
  main {
    height: 100vh;
  }
  ul {
    list-style: none;
  }
  a {
    color: #EC1C24;
    text-decoration: none;
  }
  nav {
    background-color: #ccc;
    padding: 0.5rem;
    font-weight: bold;
  }
  nav ul li {
    margin-left: 1rem;
  }
</style>
<script>
  export default {
    name: 'Home'
  }
</script>