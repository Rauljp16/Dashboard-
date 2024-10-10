import { useEffect, useState } from "react";
import { DataUsers } from "../types/global";

function UserLog() {
    const apiUrl = import.meta.env.VITE_API_DOMAIN_LOGIN;
    const [user, setUser] = useState<DataUsers | null>(null);

    const localStorageData: any = localStorage.getItem("authState");
    const token = JSON.parse(localStorageData);


    return (
        <div>{token.email}</div>
    )
}

export default UserLog