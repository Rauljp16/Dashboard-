export function delay(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
}

export async function backendApiCall(path, method = "GET", data = null) {
  const url = `${import.meta.env.VITE_API_DOMAIN}/${path}`;
  const token = JSON.parse(localStorage.getItem("authState"));
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  const json = await response.json();
  return json;
}

//John
// export async function backendApiCall(path, method = "GET", data = null) {
//   const url = ${import.meta.env.VITE_API_DOMAIN}/${path};
//   const token = localStorage.getItem(authState);
//   const response = await fetch(url, {
//     method,
//     headers: {
//       Authorization: bearer ${token},
//     },
//     body: data ?? undefined,
//   });
//   if (!response) {
//get error message
//     toaster.error(message);
//   }
//   const json = await response.json();
//   return json;
// }
