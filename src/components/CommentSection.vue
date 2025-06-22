<template>
  <div class="comment-section">
    <h3>讨论区 ({{ comments.length }})</h3>
    
    <div class="add-comment">
      <textarea v-model="newComment" placeholder="发表你的评论..."></textarea>
      <button @click="submitComment" :disabled="!newComment.trim()">提交</button>
    </div>
    
    <div class="comments">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <strong>匿名用户</strong>
          <span>{{ formatDate(comment.date) }}</span>
        </div>
        <p>{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  comments: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-comment'])

const newComment = ref('')

const submitComment = () => {
  if (newComment.value.trim()) {
    emit('add-comment', newComment.value.trim())
    newComment.value = ''
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.comment-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.add-comment {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

button {
  align-self: flex-end;
  padding: 8px 20px;
  background: #8c1d40;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.comments {
  display: grid;
  gap: 15px;
}

.comment {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #666;
}
</style>