import { IoBedOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { TbLogin } from "react-icons/tb";
import styled from "styled-components";


const SectionKPIs = styled.section`
display: flex;
`;

function KPIs() {

    return (
        <SectionKPIs>
            <article >
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
            <article >
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
            <article >
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
            <article >
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

        </SectionKPIs>
    )
}

export default KPIs