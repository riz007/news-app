import axios from 'axios';

const API_KEY = ""; // PLese enter your News API key from here https://newsapi.org/

export const GET_ALL_HEADLINES = ({ commit }) => {
  axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    .then(response => {
        commit('SET_HEADLINES', response.data);
    });
}
