<template>
  <div class="random-view">
    <h2>今天吃什么？</h2>
    
    <div class="filters">
      <div class="filter-group">
        <label>食堂：</label>
        <select v-model="selectedCanteen">
          <option value="">全部食堂</option>
          <option v-for="canteen in canteens" :key="canteen">{{ canteen }}</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>标签：</label>
        <div class="tags">
          <span 
            v-for="tag in availableTags" 
            :key="tag"
            :class="{ active: selectedTags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    
    <button @click="pickRandom" class="pick-button">随机抽取</button>
    
    <div v-if="result" class="result">
      <h3>推荐结果：</h3>
      <FoodCard :food="result" />
    </div>
    
    <div v-else class="placeholder">
      <p>点击上方按钮开始随机抽取</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFoodStore } from '@/stores/foodStore'
import FoodCard from '@/components/FoodCard.vue'

const foodStore = useFoodStore()
const selectedCanteen = ref('')
const selectedTags = ref([])
const result = ref(null)

const availableTags = ['早餐', '午餐', '晚餐', '小吃', '甜点', '健康', '辣', '素食']

const canteens = computed(() => {
  return [...new Set(foodStore.foods.map(food => food.canteen))]
})

const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
}

const pickRandom = () => {
  result.value = foodStore.getRandomFood({
    canteen: selectedCanteen.value,
    tags: selectedTags.value
  })
}
</script>

<style scoped>
.filters {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.filter-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.tags span {
  padding: 5px 15px;
  background: #f0f0f0;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.tags span.active {
  background: #8c1d40;
  color: white;
}

.pick-button {
  padding: 15px 40px;
  font-size: 1.2rem;
  background: #8c1d40;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin: 20px 0;
  transition: transform 0.3s;
}

.pick-button:hover {
  transform: scale(1.05);
}

.result {
  max-width: 500px;
  margin: 0 auto;
}

.placeholder {
  padding: 50px;
  text-align: center;
  color: #999;
  font-size: 1.2rem;
}
</style>