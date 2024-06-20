import { IoBedOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { TbLogin } from "react-icons/tb";

function Dashboard() {
  const kpisStyle = {
    display: "flex",
    justifyContent: "space-around",
    width: "90%",
  };
  const kpisArticleStyle = {
    display: "flex",
    gap: "10px",
    width: "340px",
    alignItems: "center",
    padding: "20px",
  };
  return (
    <div>
      <section style={kpisStyle}>
        <article style={kpisArticleStyle}>
          <IoBedOutline
            style={{
              width: "65px",
              height: "65px",
              padding: "18px",
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
              width: "65px",
              height: "65px",
              padding: "18px",
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
              width: "65px",
              height: "65px",
              padding: "18px",
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
              width: "65px",
              height: "65px",
              padding: "18px",
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
    </div>
  );
}

export default Dashboard;
