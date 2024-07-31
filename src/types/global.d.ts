

export interface DataBookings{
    Name: string,
    id: string,
    OrderDate: string,
    CheckIn: string,
    CheckOut: string,
    SpecialRequest: string,
    RoomType: string,
    RoomNumber: string,
    Status: string

}export interface DataComments{
    comment: string,
    photo: string,
    name: string,
    timeAgo: string,

}export interface DataContacts{
    date: string,
    id: string,
    name: string,
    email: string,
    phone: string,
    asunto: string,
    comment: string

}export interface DataRooms{
    Foto: string,
    number: string,
    id: string ,
    BedType: string,
    Amenities: string[],
    Rate: number,
    OfferPrice: number,
    Status: string,
    RoomFloor: string,

}export interface DataUsers{
    foto: string,
    name: string,
    id: string,
    startDate: string,
    description: string,
    email: string,
    contact: string,
    status: string
}
export interface Column {
    headerColumn: string,
    columnsData: string,
    columnRenderer?: (row: any) => React.ReactNode;
  }
