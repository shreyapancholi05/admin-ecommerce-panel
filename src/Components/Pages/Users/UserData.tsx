import type { UserDetail } from "../../../Types/user.js";
interface UserDataProps {
  userdata: UserDetail[],
  children: (user: UserDetail) => React.ReactNode
}
const UserData = ({ userdata, children }: UserDataProps) => {
  return (
    <ol className="grid grid-cols-4 gap-4">
      {userdata.map((user) => (
        <li className="border border-gray-200 rounded p-6" key={user.id}>
          {children(user)}
        </li>
      ))}
    </ol>
  );
};

export default UserData;
