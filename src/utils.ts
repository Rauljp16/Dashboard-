
import { DataBookings, DataComments, DataContacts, DataRooms, DataUsers } from './types/global';

type DataTypes = (DataBookings | DataUsers | DataContacts | DataRooms)[];

export function delay(data: DataTypes): Promise<DataTypes> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 200);
  });
}