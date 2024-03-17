export const postRequest = (endpoint: string, payload: unknown) => {
  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const authenticatedPost = (endpoint: string, payload: unknown) => {
  const token = localStorage.getItem('authToken');

  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authenticatedPut = (endpoint: string, payload: unknown) => {
  const token = localStorage.getItem('authToken');

  return fetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authenticatedDelete = (endpoint: string) => {
  const token = localStorage.getItem('authToken');

  return fetch(endpoint, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
