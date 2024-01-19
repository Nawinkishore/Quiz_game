<template>
    <div v-if="isLoading" class="h-screen w-full bg-yellow-300">
      <!-- ... your existing template code ... -->
      <ul>
        <li v-for="(choice, index) in question[currentqn].options" :key="index" class="flex justify-center">
          <button
            class="mt-10 cursor-pointer text-blue-600 hover:text-white font-extrabold"
            :class="{ 'bg-green-600': index === correctAnswerIndex, 'bg-red-600': selected && index !== correctAnswerIndex }"
            @click="checkanswer(index)"
            :disabled="selected"
          >
            {{ choice.quizOption }}
          </button>
        </li>
      </ul>
      <!-- ... your existing template code ... -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        question: [],
        currentqn: 0,
        selectedanswer: "",
        total: 0,
        correct: 0,
        selected: false,
        correctAnswerIndex: null,
        isLoading: false,
      };
    },
    mounted() {
      this.getquestion();
    },
    methods: {
      getquestion() {
        this.$http.$get("/api/").then((res) => {
          console.log("API response :", res);
          this.question = res.questions;
  
          this.isLoading = true;
        });
      },
      checkanswer(index) {
        if (this.question[this.currentqn].options[index].isCorrect == 1) {
          this.selectedanswer = "Correct";
          this.correct++;
          this.selected = true;
          this.correctAnswerIndex = index; // Store the index of the correct answer
        } else {
          this.selectedanswer = "Incorrect";
          this.selected = true;
          this.correctAnswerIndex = null; // Reset the correct answer index
        }
      },
      nextquestion() {
        this.currentqn++;
        this.selectedanswer = "";
        this.selected = false;
        this.correctAnswerIndex = null; // Reset the correct answer index when moving to the next question
      },
      previousqn() {
        if (this.currentqn > 0) {
          this.currentqn--;
          this.selectedanswer = "";
          this.selected = "";
          this.correctAnswerIndex = null; // Reset the correct answer index when moving to the previous question
        }
      },
      finishQuiz() {
        alert("Quiz finished" + " Your score: " + this.correct);
      },
    },
    created() {
      this.total = this.question.length;
    },
  };
  </script>
  