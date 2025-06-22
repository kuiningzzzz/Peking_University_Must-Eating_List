<template>
  <div class="home">
    <h2>今日推荐</h2>
    <div class="food-grid">
      <FoodCard 
        v-for="food in featuredFoods" 
        :key="food.id"
        :food="food"
        @vote="handleVote"
      />
    </div>
    
    <div class="add-food">
      <h3>添加新餐品</h3>
      <form @submit.prevent="addNewFood">
        <input v-model="newFood.name" placeholder="餐品名称" required>
        <input v-model="newFood.canteen" placeholder="食堂" required>
        <textarea v-model="newFood.description" placeholder="描述"></textarea>
        <div>
          <label>标签:</label>
          <div class="tags">
            <span v-for="tag in availableTags" :key="tag">
              <input type="checkbox" :id="tag" :value="tag" v-model="newFood.tags">
              <label :for="tag">{{ tag }}</label>
            </span>
          </div>
        </div>
        <button type="submit">添加</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFoodStore } from '@/stores/foodStore'
import FoodCard from '@/components/FoodCard.vue'

const foodStore = useFoodStore()
const availableTags = ['素食','荤菜','主食','小吃','甜点','饮料', '快餐', '地方特色','汤类','辣','清淡','健康']

const newFood = ref({
  name: '',
  canteen: '',
  description: '',
  tags: []
})

const featuredFoods = computed(() => {
  return [...foodStore.foods]
    .sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes))
    .slice(0, 3)
})

const addNewFood = () => {
  foodStore.addFood(newFood.value)
  newFood.value = { name: '', canteen: '', description: '', tags: [] }
}

const handleVote = ({ id, type }) => {
  foodStore.voteFood(id, type)
}
</script>

<style scoped>
.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.add-food {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
}

form {
  display: grid;
  gap: 15px;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;
}

.tags span {
  display: flex;
  align-items: center;
}
</style>