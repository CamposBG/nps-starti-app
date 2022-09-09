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
        <LazyNpsForm @isSubmittingForm="(value) => (isSubmitting = value)" @submit="handleSubmit">
            <LazyNpsInput id="email" name="email" v-model="form.email" placeholder="Digite o seu e-mail" label="E-mail" rules="required">
              <template #prepend>
                <Envelope class="w-5 h-5"/>
              </template>
            </LazyNpsInput>
            <LazyNpsInput rules="required" id="password" name="password" :type="getPasswordInputType()" v-model="form.password" placeholder="Digite sua senha" label="Senha">
              <template #prepend>
                <Lock class="w-5 h-5"/>
              </template>
              <template #append>
                  <a @click="changeIsPasswordVisibleState" href="javascript:">
                    <Eye class="w-5 h-5" v-if="!isPasswordVisible"/>
                    <EyeSlashRegular class="w-5 h-5"  v-else/>
                  </a>
              </template>
            </LazyNpsInput>
          <div class="w-1/2 mx-auto text-center">
            <LazyNpsButton class="w-full flex justify-center text-lg" type="submit" :loading="isSubmitting">
              Entrar
            </LazyNpsButton>
          </div>
        </LazyNpsForm>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {Eye, EyeSlashRegular, Envelope, Lock} from '@vicons/fa';
import {
  state,
  setToken
} from '../../store/auth';

definePageMeta({
  layout: 'blank'
});

// composables
const router = useRouter();

// refs | data
const form = reactive({
  email: null,
  password: null
});
const isPasswordVisible = ref(false);
const showLoginWrapper = ref(false);
const showWelcomeMessage = ref(false);
const passwordError = ref(false);
const passwordMessage = ref(false);
const isSubmitting= ref(false);

// methods
const getPasswordInputType = () => {
  return isPasswordVisible.value ? 'text' : 'password'
};

const changeIsPasswordVisibleState = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const handleSubmit = () => {
  passwordMessage.value = null;
  passwordError.value = false;

  console.log('loggin in...');
  setTimeout(() => {

    isSubmitting.value = false;
    setToken('token-monstro-1')
    router.push('/')
  }, 3000)
};

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
