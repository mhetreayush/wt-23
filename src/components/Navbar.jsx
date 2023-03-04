import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  const Router = useRouter();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(Router.pathname);
  }, []);
  return (
    <div className="py-2 px-6 bg-white sticky top-0 z-50 flex justify-between items-center">
      <Link href="/">
        <Image src="/assets/logo.svg" alt="logo" width={250} height={250} />
      </Link>
      <div className="flex gap-x-3">
        <Link href="/createProject">
          <h1 className="actionButton !rounded-md">Create Project</h1>
        </Link>
        {currentPath !== "/profile" && (
          <Link
            href="/profile"
            className="bg-gray-200 rounded-full p-2 flex items-center justify-center"
          >
            <CgProfile className="text-2xl" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
