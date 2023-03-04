import Link from "next/link";
import { db } from "../../firebase";
import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
const ProjectDiv = ({
  createdBy,
  members,
  tags,
  name,
  desc,

  projectId,
  setSelectedProject,
  setOpenModal,
}) => {
  const router = useRouter();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userRef = doc(db, "userProfiles", user.uid);
    const docSnap = await getDoc(userRef);
    return docSnap.data();
  };
  useEffect(() => {
    const checkEnrolled = async () => {
      const projectRef = collection(db, "projects");
      const q = query(projectRef, where("projectId", "==", projectId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs[0].data().members) {
        const members = querySnapshot.docs[0].data().members;
        const user = JSON.parse(localStorage.getItem("user"));
        members.forEach((member) => {
          if (member.uid === user.uid) {
            setIsEnrolled(true);
          }
        });
      }
      console.log(querySnapshot.docs[0].data());
    };
    checkEnrolled();
  }, []);
  const handleStartNow = async () => {
    setSelectedProject(projectId);
    const res = await getData();
    console.log(projectId);
    console.log(res);
    if (!res) {
      setOpenModal(true);
    } else {
      router.push(`/project?id=${projectId}`);
    }
  };
  return (
    <div className="flex flex-col gap-y-4 rounded-md bg-primaryYellow p-6">
      <div className="flex justify-between">
        <div className="flex gap-x-3 items-center">
          <h1 className="text-lg font-semibold">{name}</h1>
          <div className="hidden md:block">
            {tags?.map((tag, idx) => {
              return (
                <h1 key={idx} className="tagClass">
                  {tag}
                </h1>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className=" text-primaryOrange hidden md:inline-block">
            {createdBy.name}
          </h1>
          <div className="md:hidden">
            {tags?.map((tag, idx) => {
              return (
                <h1 key={idx} className="tagClass">
                  {tag}
                </h1>
              );
            })}
          </div>
        </div>
      </div>
      <p className="text-sm font-extralight w-3/4 text-gray-600">{desc}</p>

      <div className="flex justify-between md:hidden">
        <h1 className=" text-primaryOrange">{createdBy.name}</h1>
        {members?.length > 0 && (
          <h1 className="text-primaryOrange">{members.length} contributing </h1>
        )}
      </div>
      <div className="flex justify-between w-full items-center">
        {isEnrolled ? (
          <button
            className="actionButton !rounded-md"
            onClick={() => {
              router.push(`/project?id=${projectId}&isEnrolled=true`);
            }}
          >
            Go to project
          </button>
        ) : (
          <button className="actionButton !rounded-md" onClick={handleStartNow}>
            Start Project
          </button>
        )}

        <div className=" max-w-1/4 flex-wrap gap-x-2 hidden md:flex">
          {members?.length > 0 && (
            <h1 className="text-primaryOrange">
              {members.length} contributing{" "}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDiv;
