import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get } from "../../../api/UsersApi.js";
import type { UserDetail } from "../../../Types/user.js";


const UserDetails = () => {
  const { id } = useParams<{id: string}>();
  const [user, setUser] = useState<UserDetail | null>(null);

  useEffect(() => {
    const userById = async () => {
      try {
        const res = await get(`/users/${id}`);
        setUser(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
        // console.log("Error h bhai");
      }
    };
    userById();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl py-5 ">User: {user.name}</h1>

      <div className="text-lg">
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Webiste: {user.website}</p>
        <p>
          Company: {user.company.name}, {user.company.catchPhrase}
        </p>
        <p>
          Address: {user.address.street} {user.address.suite},{" "}
          {user.address.city}, {user.address.zipcode}{" "}
        </p>
        <p>
          Lattitude: {user.address.geo.lat} | Longitude: {user.address.geo.lng}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
