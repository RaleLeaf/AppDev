const API_BASE_URL = 'http://localhost:8080/api/exercises';

class ExerciseService {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  async getAllExercises() {
    return this.makeRequest(API_BASE_URL);
  }

  async getExercisesByCategory(category) {
    return this.makeRequest(`${API_BASE_URL}/category/${category}`);
  }

  async getExercisesByMuscleGroup(muscleGroup) {
    return this.makeRequest(`${API_BASE_URL}/muscle-group/${muscleGroup}`);
  }

  async getExercisesByDifficulty(difficulty) {
    return this.makeRequest(`${API_BASE_URL}/difficulty/${difficulty}`);
  }

  async searchExercises(query) {
    return this.makeRequest(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
  }

  async makeRequest(url) {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export default new ExerciseService();