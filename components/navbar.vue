<template>
  <div>
    <div id="mySidebar" class="sidebar">
      <a href="#">Dashboard</a><br>
      <a href="#">Configurações</a><br>
      <a href="#">Usuários</a><br>
    </div>
  </div>
</template>

<script setup>

</script>

<style>
  .sidebar {
  height: 100%;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #111;
  padding-top: 60px;
}

.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

.sidebar a:hover {
  color: #f1f1f1;
}

/* main .sidebar{
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
} */

/* .material-icons,
.icon-text {
  vertical-align: middle;
}

.material-icons {

  margin-right: 30px
} */

/* #main {
  transition: margin-left 0.5s;
  padding: 16px;
  margin-left: 250px;
} */

@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}
</style>