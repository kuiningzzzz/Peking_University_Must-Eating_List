<template>
  <div class="ranking-view">
    <h2>排行榜</h2>
    
    <div class="time-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div class="ranking-list">
      <div v-for="(food, index) in currentRanking" :key="food.id" class="ranking-item">
        <div class="rank">{{ index + 1 }}</div>
        <div class="food-info">
          <h3>{{ food.name }}</h3>
          <span class="canteen">{{ food.canteen }}</span>
        </div>
        <div class="stats">
          <span>👍 {{ food.likes }}</span>
          <span>👎 {{ food.dislikes }}</span>
          <span>⭐ {{ food.likes - food.dislikes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFoodStore } from '@/stores/foodStore'

const foodStore = useFoodStore()
const activeTab = ref('weekly')

const tabs = [
  { id: 'weekly', label: '周榜' },
  { id: 'monthly', label: '月榜' },
  { id: 'yearly', label: '年榜' }
]

const currentRanking = computed(() => {
  return foodStore.rankings[activeTab.value]
})
</script>

<style scoped>
.time-tabs {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.time-tabs button {
  padding: 8px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.time-tabs button.active {
  background: #8c1d40;
  color: white;
}

.ranking-list {
  display: grid;
  gap: 15px;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.rank {
  font-size: 1.8rem;
  font-weight: bold;
  min-width: 50px;
  text-align: center;
  color: #8c1d40;
}

.food-info {
  flex-grow: 1;
  padding: 0 20px;
}

.food-info h3 {
  margin: 0 0 5px 0;
}

.canteen {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.stats {
  display: flex;
  gap: 15px;
}

.stats span {
  min-width: 50px;
  text-align: center;
}
</style>