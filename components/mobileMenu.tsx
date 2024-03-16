import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const router = useRouter();
  const navigate = useCallback(
    (to: string, blank: boolean) => {
      if (blank) return (window.location.href = to);
      router.push("/");
    },
    [router]
  );
  return (
    <>
      {visible && (
        <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
          <div className="flex flex-col gap-4">
            <div
              onClick={() => navigate("/", false)}
              className="px-3 text-center text-white hover:underline"
            >
              Home
            </div>
            <div
              onClick={() => navigate("/#series", true)}
              className="px-3 text-center text-white hover:underline"
            >
              Series
            </div>
            <div
              onClick={() => navigate("/#movie", true)}
              className="px-3 text-center text-white hover:underline"
            >
              Flims
            </div>
            <div className="px-3 text-center text-white hover:underline">
              New & Popular
            </div>
            <div className="px-3 text-center text-white hover:underline">
              My list
            </div>
            <div className="px-3 text-center text-white hover:underline">
              Browse by languages
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
