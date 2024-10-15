<template>
  <div class="vintage">
    <div class="nav-container">
      <Nav />
    </div>
    <div class="main-container center ">
      <div class="message-container">
        <AuthMessage />
      </div>
      <div class="center">
        <NuxtRouteAnnouncer />
        <NuxtPage />
      </div>
    </div>
    <div class="footer-container">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.message-container {
  position: absolute;
  right: 0;
  margin: 1vh;
}

.message {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1200px) {
  .nav-container {
    padding: 1vh;
    width: fit-content;
    margin: auto;
  }

  .main-container {
    min-height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .footer-container {
    padding: 1vh;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }


}

@media (max-width: 767px) {
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 100vh;
    padding: 0;
  }
}

@media (min-width: 768px) and (max-width: 979px) {
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 100vh;
    padding: 0;
  }
}

@media (max-width: 480px) {
  .center {}

  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    min-height: 100vh;
    padding: 0;
  }

  .nav {
    padding: 0;
    margin: 0;
  }
}
</style>
