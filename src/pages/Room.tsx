import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSingleThunk } from "../slices/rooms/roomsThunk";
import Loading from "../components/Loading";

function Room() {
  const dispatch: AppDispatch = useDispatch();
  const { _id } = useParams<{ _id: string }>();
  const singleRoom = useSelector(
    (state: RootState) => state.roomSlice.singleRoom
  );
  useEffect(() => {
    if (_id) {
      dispatch(fetchSingleThunk(_id));
    }
  }, [dispatch, _id]);

  if (!singleRoom) {
    return <Loading />
  }

  return (
    <div>
      <h2>Room Details</h2>
      <p>
        <strong>Bed Type:</strong> {singleRoom.BedType}
      </p>
      <p>
        <strong>Facilities:</strong> {singleRoom.Facilities.join(", ")}
      </p>
      <p>
        <strong>Room Floor:</strong> {singleRoom.RoomFloor}
      </p>
      <p>
        <strong>Room Number:</strong> {singleRoom.number}
      </p>
      <p>
        <strong>Status:</strong> {singleRoom.Status}
      </p>
    </div>
  );
}

export default Room;
