import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFoodStore = defineStore('food', () => {
  // 从本地存储初始化数据
  const foods = ref(JSON.parse(localStorage.getItem('foods')) || [])
  
  // 添加新餐品
  const addFood = (food) => {
    foods.value.push({
      ...food,
      id: Date.now(),
      likes: 0,
      dislikes: 0,
      comments: []
    })
    saveToLocalStorage()
  }
  
  // 删除餐品
  const deleteFood = (id) => {
    foods.value = foods.value.filter(food => food.id !== id)
    saveToLocalStorage()
  }
  
  // 更新餐品信息
  const updateFood = (id, updatedInfo) => {
    const index = foods.value.findIndex(food => food.id === id)
    if (index !== -1) {
      foods.value[index] = { ...foods.value[index], ...updatedInfo }
      saveToLocalStorage()
    }
  }
  
  // 投票功能
  const voteFood = (id, type) => {
    const food = foods.value.find(food => food.id === id)
    if (food) {
      type === 'like' ? food.likes++ : food.dislikes++
      saveToLocalStorage()
    }
  }
  
  // 添加评论
  const addComment = (id, comment) => {
    const food = foods.value.find(food => food.id === id)
    if (food) {
      food.comments.push({
        id: Date.now(),
        text: comment,
        date: new Date().toISOString()
      })
      saveToLocalStorage()
    }
  }
  
  // 本地存储持久化
  const saveToLocalStorage = () => {
    localStorage.setItem('foods', JSON.stringify(foods.value))
  }
  
  // 计算不同时间段的排行榜
  const rankings = computed(() => {
    const calculateScore = (food) => food.likes * 2 - food.dislikes
    
    return {
      weekly: [...foods.value].sort((a, b) => calculateScore(b) - calculateScore(a)).slice(0, 10),
      monthly: [...foods.value].sort((a, b) => b.likes - a.likes).slice(0, 10),
      yearly: [...foods.value].sort((a, b) => calculateScore(b) - calculateScore(a)).slice(0, 10)
    }
  })
  
  // 随机抽取功能
  const getRandomFood = (filter) => {
    let filtered = foods.value
    if (filter.canteen) {
      filtered = filtered.filter(f => f.canteen === filter.canteen)
    }
    if (filter.tags && filter.tags.length > 0) {
      filtered = filtered.filter(f => 
        filter.tags.every(tag => f.tags.includes(tag)))
    }
    return filtered.length > 0 
      ? filtered[Math.floor(Math.random() * filtered.length)] 
      : null
  }

  //搜索
  const searchFoods = (filter,query) => {
    let filtered = foods.value
    if (filter.canteen) {
      filtered = filtered.filter(f => f.canteen === filter.canteen)
    }
    if (filter.tags && filter.tags.length > 0) {
      filtered = filtered.filter(f => 
        filter.tags.every(tag => f.tags.includes(tag)))
    }
    if (query) {
      filtered = filtered.filter(f => 
        f.name.includes(query) ||
        f.description.includes(query)
      )
    }
    return filtered
  }
  
  return { 
    foods, 
    addFood, 
    deleteFood, 
    updateFood, 
    voteFood,
    addComment,
    rankings,
    getRandomFood,
    searchFoods
  }
})