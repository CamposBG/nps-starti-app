<template>
  <div class="login-container">
    <Transition name="slide-fade">
      <div class="login-message" v-if="showWelcomeMessage">
        <h1>Bem-vindo ao Starti NPS</h1>
        <p>Realize o login para acessar o sistema</p>
      </div>
    </Transition>
    <Transition name="bounce" appear>
      <div class="login-wrapper" v-if="showLoginWrapper">
        <LazyLoginForm />
      </div>
    </Transition>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'blank'
});

// refs | data
const showLoginWrapper = ref(false);
const showWelcomeMessage = ref(false);

// methods

// lifecycles
onMounted(() => {
  showLoginWrapper.value = true;
  showWelcomeMessage.value = true;
});

</script>

<style lang="scss" scoped>
  .login-container {
    @apply w-screen h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover;

    background-image: url('~/assets/images/bg.svg');


    .login-message {
    @apply flex flex-col justify-center items-center pb-10 text-white;
    
    h1 {
      @apply text-4xl font-medium;
    }

    p {
      @apply text-sm;
    }
  }

  .login-wrapper {
    @apply w-1/2 h-fit md:w-1/4 mx-auto bg-gray-100 border rounded-md p-5 shadow-md;
  }
}


.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}


.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
