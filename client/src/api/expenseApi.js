const BASE_URL = "http://localhost:5000/api/expenses";

const getExpenses = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }

  return response.json();
};

export { getExpenses };
