<template>
  <div class="food-card">
    <div class="card-header">
      <h3>{{ food.name }}</h3>
      <span class="canteen">{{ food.canteen }}</span>
    </div>
    
    <div class="tags">
      <span v-for="tag in food.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    
    <p v-if="food.description">{{ food.description }}</p>
    
    <div class="actions">
      <button @click="vote('like')">👍 {{ food.likes }}</button>
      <button @click="vote('dislike')">👎 {{ food.dislikes }}</button>
      <router-link :to="`/food/${food.id}`">查看详情</router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  food: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['vote'])

const vote = (type) => {
  emit('vote', { id: props.food.id, type })
}
</script>

<style scoped>
.food-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.3s;
  background: white;
}

.food-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.canteen {
  background: #8c1d40;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.tag {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  flex: 1;
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-child {
  background: #e6f7ff;
}

button:nth-child(2) {
  background: #fff2e8;
}

a {
  display: block;
  text-align: center;
  padding: 5px;
  background: #f9f9f9;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}
</style>