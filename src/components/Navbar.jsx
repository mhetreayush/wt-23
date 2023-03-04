import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { db } from "../../firebase";
import CreateProfileModal from "./CreateProfileModal";
const Navbar = () => {
  const Router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(Router.pathname);
  }, []);

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userRef = doc(db, "userProfiles", user.uid);
    const docSnap = await getDoc(userRef);
    return docSnap.data();
  };

  const handleStartNow = async () => {
    const res = await getData();
    console.log(res);
    if (!res) {
      setOpenModal(true);
    } else {
      Router.push(`/createProject`);
    }
  };
  return (
    <>
      <div className="py-2 px-2 md:px-6 bg-white/30 backdrop-blur shadow sticky top-0 z-50 flex justify-between items-center">
        <Link href="/home">
          {/* <Image src="/assets/logo.svg" alt="logo" width={250} height={250} /> */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.svg"
            alt="logo"
            className="w-[150px] md:w-[250px]"
          />
        </Link>
        <div className="flex gap-x-3">
          <button onClick={handleStartNow} className="actionButton rounded-md">
            Create Project
          </button>
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
      <CreateProfileModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        createProject
      />
    </>
  );
};

export default Navbar;
