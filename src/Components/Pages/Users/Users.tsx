import { useEffect, useState } from "react";
import { get } from "../../../api/UsersApi.js";
import { Link } from "react-router";
import UserData from "./UserData.js";
import type { UserDetail } from "../../../Types/user.js";

const Users = () => {
  const [data, setData] = useState<UserDetail[]>([]);
  const getUserData = async () => {
    const res = await get("/users");
    setData(res.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className=" flex items-center flex-col px-8">
        <h1 className="font-bold text-2xl py-5 wrap-break-word">User data</h1>
        <UserData userdata ={data}>
          {(user) => {
            const {
              id,
              name,
              username,
              email,
              phone,
              website,
              company,
              address,
            } = user;

            return (
              <Link key={id} to={`/users/${id}`}>
                <p className="font-medium "> {name}</p>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                <p>Webiste: {website}</p>
                <p>
                  Company: {company.name}, {company.catchPhrase}
                </p>
                <p>
                  Address: {address.street} {address.suite}, {address.city},{" "}
                  {address.zipcode}{" "}
                </p>
                <p>
                  Lattitude: {address.geo.lat} | Longitude: {address.geo.lng}
                </p>
              </Link>
            );
          }}
        </UserData>
      </div>
    </>
  );
};

export default Users;
