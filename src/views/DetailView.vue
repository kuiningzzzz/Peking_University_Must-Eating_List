<template>
  <div class="detail-view">
    <div v-if="food" class="food-detail">
      <div class="header">
        <h2>{{ food.name }}</h2>
        <div>
          <span class="canteen">{{ food.canteen }}</span>
          <div class="tags">
            <span v-for="tag in food.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
      
      <p>{{ food.description || '暂无描述' }}</p>
      
      <div class="rating">
        <button @click="vote('like')">👍 {{ food.likes }}</button>
        <button @click="vote('dislike')">👎 {{ food.dislikes }}</button>
        <RatingChart :likes="food.likes" :dislikes="food.dislikes" />
      </div>
      
      <div class="actions">
        <router-link to="/">返回首页</router-link>
        <button @click="editMode = !editMode">{{ editMode ? '取消' : '编辑' }}</button>
        <button @click="deleteFood" class="delete">删除</button>
      </div>
      
      <div v-if="editMode" class="edit-form">
        <h3>编辑餐品信息</h3>
        <input v-model="editData.name" placeholder="名称">
        <input v-model="editData.canteen" placeholder="食堂">
        <textarea v-model="editData.description" placeholder="描述"></textarea>
        <div class="tags">
          <span v-for="tag in availableTags" :key="tag">
            <input type="checkbox" :id="`edit-${tag}`" :value="tag" v-model="editData.tags">
            <label :for="`edit-${tag}`">{{ tag }}</label>
          </span>
        </div>
        <button @click="saveChanges">保存</button>
      </div>
    </div>
    
    <CommentSection 
      v-if="food" 
      :comments="food.comments" 
      @add-comment="addComment"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFoodStore } from '@/stores/foodStore'
import CommentSection from '@/components/CommentSection.vue'
import RatingChart from '@/components/RatingChart.vue'

const route = useRoute()
const router = useRouter()
const foodStore = useFoodStore()
const editMode = ref(false)
const availableTags = ['早餐', '午餐', '晚餐', '小吃', '甜点', '健康', '辣', '素食']

const food = computed(() => {
  return foodStore.foods.find(f => f.id === parseInt(route.params.id))
})

const editData = ref({
  name: '',
  canteen: '',
  description: '',
  tags: []
})

onMounted(() => {
  if (food.value) {
    editData.value = { ...food.value }
  }
})

const vote = (type) => {
  foodStore.voteFood(food.value.id, type)
}

const deleteFood = () => {
  if (confirm('确定要删除这个餐品吗？')) {
    foodStore.deleteFood(food.value.id)
    router.push('/')
  }
}

const saveChanges = () => {
  foodStore.updateFood(food.value.id, editData.value)
  editMode.value = false
}

const addComment = (comment) => {
  foodStore.addComment(food.value.id, comment)
}
</script>

<style scoped>
.food-detail {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.canteen {
  background: #8c1d40;
  color: white;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.9rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.tag {
  background: #f0f0f0;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
}

.rating button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.rating button:first-child {
  background: #e6f7ff;
}

.rating button:nth-child(2) {
  background: #fff2e8;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.actions button, .actions a {
  padding: 8px 15px;
  text-decoration: none;
  color: #333;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions .delete {
  background: #ffeded;
  color: #f00;
}

.edit-form {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.edit-form input, .edit-form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>