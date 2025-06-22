<template>
  <div class="rating-chart">
    <div class="chart-container">
      <div class="chart-bar like-bar" :style="{ width: likePercentage + '%' }">
        <span class="label">👍 {{ likes }} ({{ likePercentage }}%)</span>
      </div>
      <div class="chart-bar dislike-bar" :style="{ width: dislikePercentage + '%' }">
        <span class="label">👎 {{ dislikes }} ({{ dislikePercentage }}%)</span>
      </div>
    </div>
    
    <div class="legend">
      <div class="legend-item">
        <div class="color-box like"></div>
        <span>点赞</span>
      </div>
      <div class="legend-item">
        <div class="color-box dislike"></div>
        <span>点踩</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
})

const totalVotes = computed(() => props.likes + props.dislikes)
const likePercentage = computed(() => 
  totalVotes.value ? Math.round((props.likes / totalVotes.value) * 100) : 50
)
const dislikePercentage = computed(() => 
  totalVotes.value ? 100 - likePercentage.value : 50
)
</script>

<style scoped>
.rating-chart {
  margin-top: 10px;
}

.chart-container {
  display: flex;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.chart-bar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.5s ease;
}

.like-bar {
  background: linear-gradient(to right, #8bc34a, #4caf50);
}

.dislike-bar {
  background: linear-gradient(to right, #ff9800, #f44336);
}

.label {
  font-size: 0.8rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  padding: 0 5px;
  white-space: nowrap;
}

.legend {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
}

.color-box {
  width: 15px;
  height: 15px;
  border-radius: 3px;
}

.color-box.like {
  background: #4caf50;
}

.color-box.dislike {
  background: #f44336;
}
</style>