<template>
  <div v-if="isLoading" class="h-screen w-full bg-yellow-300">
    <!--   -->
    <div v-if="currentqn < question.length">
      <div class="text-center p-5 font-bold text-2xl text-white">
        <h1 class="shadow-md p-5 shadow-black">QUIZ GAME</h1>
      </div>
      <p
        class="text-center mt-5 font-extrabold underline decoration-4 decoration-white underline-offset-8 text-xl"
      >
        {{ question[currentqn].sentence }}
      </p>
    </div>
    <ul>
      <li
        v-for="(choice, index) in question[currentqn].options"
        :key="index"
        class="flex justify-center"
      >
        <button
          class="w-[300px] bg-blue-500 hover:text-white font-extrabold mt-10 cursor-pointer transition ease-in-out delay-150 text-white p-3 rounded-xl hover:scale-110 duration-300"
          :class="{
            '!bg-green-500 w-full rounded-md':
              index === correctIndexAnswer,
            '!bg-red-500 w-full rounded-md text-white':
              selected && index == !correctIndexAnswer,
          }"
          @click="checkanswer(index)"
          :disabled="selected"
        >
          {{ choice.quizOption }}
        </button>
      </li>
    </ul>

    <div class="flex justify-center gap-5 mt-10">
      <button
        @click="nextquestion()"
        v-show="currentqn < question.length - 1"
        class="w-auto h-6 px-3 rounded-sm font-thin bg-white hover:transition ease-in-out hover:scale-110 delay-150 hover:duration-300"
      >
        Next Question
      </button>
      <button
        v-if="currentqn === question.length - 1"
        @click="finishQuiz()"
        class="w-auto h-6 px-3 rounded-sm font-thin bg-black text-white"
      >
        Finish
      </button>
    </div>

    <p
      class="text-center mt-5 mx-auto"
      :class="{
        'bg-green-500 w-max h-fit p-2 text-white ':
          selectedanswer === 'Correct',
        'bg-red-500 w-max h-fit p-2 text-white': selectedanswer === 'Incorrect',
      }"
    >
      {{ selectedanswer }}
    </p>
    <p class="text-center text-blue-500">
      Your score : <span class="text-black">{{ correct }}</span>
    </p>
    <!-- <p class="text-center ">Total question : {{ total }}</p> -->
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
      isLoading: false,
      correctIndexAnswer: null,
      isClicks: false,
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
        this.correctIndexAnswer = index;
      } else {
        this.selectedanswer = "Incorrect";
        this.selected = true;
        this.correctIndexAnswer = null;
      }
      this.isClicks = true;
    },
    nextquestion() {
      if (this.isClicks == true) {
        this.currentqn++;
        this.selectedanswer = "";
        this.selected = false;
        this.correctIndexAnswer = "";
      } else {
        alert("Please select any options");
      }
      this.isClicks = false;
    },

    finishQuiz() {
      alert("Quiz finished" + "Your score :" + this.correct);
    },
  },
  created() {
    this.total = this.question.length;
  },
};
</script>
