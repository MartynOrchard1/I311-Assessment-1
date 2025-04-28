<template>
    <div class="card p-4">
      <h4>{{ question.question }}</h4>
  
      <div v-if="question.type === 'multiple-choice'" class="mt-3">
        <button
          v-for="(option, index) in question.options"
          :key="index"
          class="btn btn-outline-primary m-2"
          :class="{ active: userAnswer === option }"
          @click="selectAnswer(option)"
        >
          {{ option }}
        </button>
      </div>
  
      <div v-else class="mt-3">
        <button
          class="btn btn-outline-success m-2"
          :class="{ active: userAnswer === true }"
          @click="selectAnswer(true)"
        >
          True
        </button>
        <button
          class="btn btn-outline-danger m-2"
          :class="{ active: userAnswer === false }"
          @click="selectAnswer(false)"
        >
          False
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      question: Object,
      userAnswer: [String, Boolean]
    },
    methods: {
      selectAnswer(answer) {
        this.$emit('answered', answer);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Optional: You can add small custom styles if needed */
  </style>
  