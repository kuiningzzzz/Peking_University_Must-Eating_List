<template>
  <nav class="navbar">
    <h1>北京大学必吃榜</h1>
    <div class="nav-buttons">
      <router-link to="/">首页</router-link>
      <router-link to="/ranking">排行榜</router-link>
      <router-link to="/random">随机抽取</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #8c1d40;
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-buttons a {
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-buttons a:hover {
  background: rgba(255,255,255,0.2);
}

.nav-buttons a.router-link-exact-active {
  background: rgba(255,255,255,0.3);
}
</style>