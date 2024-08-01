import { DataBookings, DataComments, DataContacts, DataRooms, DataUsers } from './types/global';

type DataTypes = (DataBookings | DataUsers | DataContacts | DataRooms)[];

export function delay(data: DataTypes): Promise<DataTypes> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 200);
  });
}

export async function backendApiCall(path: string, method = "GET", data: any = null) {
  const url = `${import.meta.env.VITE_API_DOMAIN}/${path}`;
  const authState = localStorage.getItem("authState");

  if (authState === null) {
    throw new Error("No authState found in localStorage");
  }

  const token = JSON.parse(authState);

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
