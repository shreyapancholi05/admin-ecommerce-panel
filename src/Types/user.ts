export interface User {
  id?: number;
  username?: string;
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  dob?: string;
  address?: string;
  mobile?: string;
}

export interface UserDetail  {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

// assName="font-bold text-2xl py-5 ">User: {user.name}</h1>

//       <div className="text-lg">
//         <p>Username: {user.username}</p>
//         <p>Email: {user.email}</p>
//         <p>Phone: {user.phone}</p>
//         <p>Webiste: {user.website}</p>
//         <p>
//           Company: {user.company.name}, {user.company.catchPhrase}
//         </p>
//         <p>
//           Address: {user.address.street} {user.address.suite},{" "}
//           {user.address.city}, {user.address.zipcode}{" "}
//         </p>
//         <p>
//           Lattitude: {user.address.geo.lat} | Longitude: {user.address.geo.lng}
