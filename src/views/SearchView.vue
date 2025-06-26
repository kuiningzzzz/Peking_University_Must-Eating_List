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
        <label>餐品名称：</label>
        <input v-model="searchInput.value" placeholder="餐品名称">
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

      <div class="button-container">
        <button @click="pickSearch" class="pick-button">搜索</button>
      </div>
    </div>
    
    <div v-if="result" class="result">
      <h3>推荐结果：</h3>
      <FoodCard v-for="food in result" :key="food.id" :food="food" />
    </div>
    
    <div v-else class="placeholder">
      <p>点击上方按钮开始搜索</p>
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
const searchInput = ref('')

const availableTags = ['素食','荤菜','主食','小吃','甜点','饮料', '快餐', '地方特色','汤类','辣','清淡','健康']

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

const pickSearch = () => {
  result.value = foodStore.searchFoods({
    canteen: selectedCanteen.value,
    tags: selectedTags.value
  }, searchInput.value)
}
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: space-between; /* 左右分列 */
  align-items: flex-start; /* 顶部对齐 */
  flex-wrap: wrap; /* 允许换行 */
}

.filter-group {
  flex: 1; /* 占据剩余空间 */
  min-width: 300px; /* 防止挤压 */
}

.button-container {
  display: flex;
  justify-content: flex-end; /* 按钮右对齐 */
  padding: 20px;
  width: 100%; /* 移动端占满宽度 */
}

input, textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
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

@media (min-width: 768px) {
  .button-container {
    width: auto; /* 取消宽度限制 */
    padding-top: 0; /* 顶部对齐 */
    align-self: center; /* 垂直居中 */
  }
}

</style>