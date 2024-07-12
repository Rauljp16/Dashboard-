import { IoBedOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { TbLogin } from "react-icons/tb";
import Comments from "../components/Comments";
import Button from "../components/Button";

function Dashboard() {
  const kpisStyle = {
    display: "flex",
    justifyContent: "space-between",
    margin: "30px",
  };
  const kpisArticleStyle = {
    display: "flex",
    gap: "10px",
    minWidth: "20%",
    alignItems: "center",
    padding: "16px 40px 16px 16px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
  };
  return (
    <div>
      <section style={kpisStyle}>
        <article style={kpisArticleStyle}>
          <IoBedOutline
            style={{
              width: "55px",
              height: "55px",
              padding: "12px",
              backgroundColor: "#f44040",
              borderRadius: "8px",
            }}
          />
          <div>
            <p>8,461</p>
            <p>New Booking</p>
          </div>
        </article>
        <article style={kpisArticleStyle}>
          <FaRegCalendarAlt
            style={{
              width: "55px",
              height: "55px",
              padding: "12px",
              backgroundColor: "#f44040",
              borderRadius: "8px",
            }}
          />
          <div>
            <p>963</p>
            <p>Scheduled Room</p>
          </div>
        </article>
        <article style={kpisArticleStyle}>
          <TbLogin
            style={{
              width: "55px",
              height: "55px",
              padding: "12px",
              backgroundColor: "#fbbebe",
              borderRadius: "8px",
            }}
          />
          <div>
            <p>753</p>
            <p>Check In</p>
          </div>
        </article>
        <article style={kpisArticleStyle}>
          <TbLogout
            style={{
              width: "55px",
              height: "55px",
              padding: "12px",
              backgroundColor: "#fbbebe",
              borderRadius: "8px",
            }}
          />
          <div>
            <p>516</p>
            <p>Check Out</p>
          </div>
        </article>
      </section>
      <Comments />
      <Button />
      <Button color="green" />
    </div>
  );
}

export default Dashboard;
