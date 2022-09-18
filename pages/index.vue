<template>
  <div>
    Bem-vindo ao portal de administração do NPS da Startidsadasdas
    <ConfigSelectPosition @selectPosition="getSelectedPosition" />
  </div>
</template>

<script setup>
import {state} from '../store/auth'
const getSelectedPosition = (positionValue) => {
  console.log({positionValue})
}

</script>