import Vue from 'vue';
import Vuex from 'vuex';
import Api from './services/Api';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,

    test: []
  },
  getters: {
    getTest: ({ test }) => test
  },
  mutations: {
    //User mutations
    setUser(state, user) {
      state.user = user;
      if (user) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },

    //Test mutations
    setTest(state, test) {
      state.test = test;
    },
    setAnswer(state, answer) {
      state.test.questions[answer.questionIndex].answers[
        answer.answerIndex
      ].checked = true;
    },
    setFeedback(state, feedback) {
      state.test.questions[feedback.index].feedback = feedback.feedback;

      feedback.feedback == 'Correct answer!' &&
      state.test.questions[feedback.index].questionType == 'single'
        ? (state.test.questions[feedback.index].isDone = true)
        : '';
    },
    setQuestionAttemps(state, attemp) {
      state.test.questions[attemp.index].attemps = attemp.attemps;

      //TODO: user points
      // state.test.questions[attemp.index].attemps == 2 &&
      // state.test.questions[attemp.index].isDone == true
      //   ? (state.test.questions[attemp.index].userpoints = 3)
      //   : (state.test.questions[attemp.index].userpoints =
      //       state.test.questions[attemp.index].userpoints);
      // state.test.questions[attemp.index].attemps == 1 &&
      // state.test.questions[attemp.index].isDone == true
      //   ? (state.test.questions[attemp.index].userpoints = 2)
      //   : (state.test.questions[attemp.index].userpoints =
      //       state.test.questions[attemp.index].userpoints);
      // state.test.questions[attemp.index].attemps == 0 &&
      // state.test.questions[attemp.index].isDone == true
      //   ? (state.test.questions[attemp.index].userpoints = 1)
      //   : (state.test.questions[attemp.index].userpoints =
      //       state.test.questions[attemp.index].userpoints);
    }
  },
  actions: {
    //User actions
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    getUser({ commit }) {
      Api()
        .get('getuser')
        .then(res => {
          commit('setUser', res.data);
        })
        .catch(err => console.log(err));
    },

    //Test actions
    setTest({ commit }, test) {
      commit('setTest', test);
    },
    setAnswer({ commit }, answer) {
      commit('setAnswer', answer);
    },
    setFeedback({ commit }, feedback) {
      commit('setFeedback', feedback);
    },
    setQuestionAttemps({ commit }, attemp) {
      commit('setQuestionAttemps', attemp);
    }
  }
});
