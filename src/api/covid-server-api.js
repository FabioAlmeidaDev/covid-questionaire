import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001',
  // baseURL: 'https://covid-waiver-server.herokuapp.com',
  headers: {
    // Authorization: 'Bearer JUZpWvW06EaLF1DYq7O8pb4lN4D5nMoo3GpQ3tjODiNa34ZCu_1uyUUtLiQjUPEJ_rD0tSsAsQfQWZTL6Fey0WlrUraSJet5t4m81bLHsC16d7NE6pRHMQtJreuxXXYx'
  }
});
