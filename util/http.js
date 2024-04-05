import axios from "axios";

const BACKEND_URL = 'https://skilful-rain-409314-default-rtdb.asia-southeast1.firebasedatabase.app/scores/guessCount.json'
 

export function storeScore(score) {
  if (fetchScore() > score.guessCount) {
    return;
  }

  return axios.put(
    BACKEND_URL,
    score
  );
}

export function fetchScore(){
  return axios.get(BACKEND_URL)
    .then(response => response.data);
}