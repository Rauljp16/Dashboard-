import Table from '../components/Table';
import Select from '../components/Select';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllThunk } from '../components/slice/bookings/bookingsThunk';

function Bookings() {
  const bookingsStatus = useSelector((state) => state.bookingSlice.status);
  const dataBooking = useSelector((state) => state.bookingSlice.dataBooking);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookingsStatus === 'idle') {
      dispatch(fetchAllThunk());
    }
  }, [bookingsStatus, dispatch]);

  const order = ['All Bookings', 'Checking In', 'Checking Out', 'In Progress'];

  const headerColumns = [
    'Guest',
    'Order Date',
    'Check In',
    'Check Out',
    'Special Request',
    'Room Type',
    'Status',
  ];

  const columnsData = [
    'Guest',
    'OrderDate',
    'CheckIn',
    'CheckOut',
    'SpecialRequest',
    'RoomType',
    'Status',
  ];

  function openNote(e) {
    alert(e);
  }

  const columnRenderers = {
    Guest: (row) => (
      <div onClick={() => openNote(row.Name)}>
        <p>{row.Name}</p>
        <p>{row.id}</p>
      </div>
    ),
    SpecialRequest: (row) => (
      <button onClick={() => openNote(row.SpecialRequest)}>View Notes</button>
    ),
    RoomType: (row) => `${row.RoomType}-${row.RoomNumber}`,
    Status: (row) =>
      row.Status === 'Check In' ? (
        <p style={{ color: 'green' }}>{row.Status}</p>
      ) : row.Status === 'Check Out' ? (
        <p style={{ color: 'red' }}>{row.Status}</p>
      ) : (
        <p style={{ color: 'yellow' }}>{row.Status}</p>
      ),
  };

  const options = ['Guest', 'Order Date', 'Check In', 'Check Out'];

  function onChange(e) {
    console.log(e);
  }

  return (
    <div>
      <ul>
        {order.map((ord, orderIndex) => (
          <li key={orderIndex}>{ord}</li>
        ))}
      </ul>
      <Select options={options} onChange={onChange} />
      <Table
        headerColumns={headerColumns}
        columnsData={columnsData}
        data={dataBooking}
        columnRenderers={columnRenderers}
      />
    </div>
  );
}

export default Bookings;
