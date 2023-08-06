import React, { useEffect, useState } from "react";
import profile from "../../public/images/profile.png";
import Image from "next/image";

const Users = () => {
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("https://blog-zlon.onrender.com/users");
        const data = await res.json();
        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="h-fit bg-gray-100 rounded-md p-3">
      <div className="flex flex-col border-teal-500 gap-2 border max-h-80 rounded-md p-2 divide-y overflow-y-scroll">
        <p className="font-semibold text-base text-center">Users</p>
        {allUsers?.map((user) => (
          <div className="flex gap-3 items-center p-1" key={user._id}>
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
              <Image
                src={user?.image ? user.image.url : profile}
                alt="profile"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-sm">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
