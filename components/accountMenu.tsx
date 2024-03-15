/* eslint-disable @next/next/no-img-element */
import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuItemProps {
  visible: boolean;
}
const AccountMenu: React.FC<AccountMenuItemProps> = ({ visible }) => {
  const { data } = useCurrentUser();
  if (!visible) return null;
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5  flex-col border-2 border-gray-800 flex  rounded-md">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-wor gap-3 items-center w-full">
          <img
            src="/images/default-blue.png"
            alt="user"
            className="w-8 rounded-md"
          />
          <p className="text-white text-sm group-hover/item:underline ">
            {data?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white hover:underline"
        >
          Sign out of netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
