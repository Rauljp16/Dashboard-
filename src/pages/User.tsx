import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleThunk } from "../slices/users/usersThunk";
import Loading from "../components/Loading";

function user() {
  const dispatch: AppDispatch = useDispatch();
  const { _id } = useParams<{ _id: string }>();
  const singleUser = useSelector(
    (state: RootState) => state.userSlice.singleUser
  );
  useEffect(() => {
    if (_id) {
      dispatch(fetchSingleThunk(_id));
    }
  }, [dispatch, _id]);

  if (!singleUser) {
    return <Loading />;
  }
  return (
    <div>
      <h2>User Details</h2>
      <img
        style={{ width: "79px", borderRadius: "100%" }}
        src={singleUser.foto}
        alt="foto de usuario"
      />
      <p>
        <strong>Name:</strong> {singleUser.name}
      </p>
      <p>
        <strong>Contact:</strong> {singleUser.contact}
      </p>
      <p>
        <strong>Email:</strong> {singleUser.email}
      </p>
      <p>
        <strong>Description:</strong> {singleUser.description}
      </p>
    </div>
  );
}

export default user;
