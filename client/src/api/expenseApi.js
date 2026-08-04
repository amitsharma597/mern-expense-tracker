const BASE_URL = "http://localhost:5000/api/expenses";

const getExpenses = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }

  return response.json();
};

const createExpenses = async (expense) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
    throw new Error("Failed to create expenses");
  }

  return response.json();
};

export { getExpenses, createExpenses };
