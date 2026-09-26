const API_URL = `${import.meta.env.VITE_API_URL}/api/expenses`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getExpenses = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch expenses");
  }

  return data;
};

export const createExpenses = async (expense) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(expense),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create expense");
  }

  return data;
};

export const updateExpense = async (id, expense) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(expense),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update expense");
  }

  return data;
};

export const deleteExpense = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete expense");
  }

  return data;
};
