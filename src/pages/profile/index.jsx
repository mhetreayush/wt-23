import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import ProjectDiv from "@/components/ProjectDiv";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
const Profile = () => {
  const [enrolledProjects, setEnrolledProjects] = useState([]);
  const [createdProjects, setCreatedProjects] = useState([]);
  const getEnrolledProjects = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const projectsRef = collection(db, "projects");

    const querySnapshot = await getDocs(projectsRef);

    querySnapshot.forEach((doc) => {
      if (doc.id) {
        const members = doc.data().members;
        members?.forEach((member) => {
          if (member.uid === user.uid) {
            setEnrolledProjects((prev) => [...prev, doc.data()]);
          }
        });
      }
    });
  };
  const getCreatedProjects = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const projectsRef = collection(db, "projects");

    const querySnapshot = await getDocs(projectsRef);
    querySnapshot.docs.forEach((doc) => {
      if (doc.id) {
        if (doc.data().createdBy.uid === user.uid) {
          setCreatedProjects((prev) => [...prev, doc.data()]);
        }
      }
    });
  };
  useEffect(() => {
    getEnrolledProjects();
    getCreatedProjects();
  }, []);
  return (
    <>
      <Navbar />
      <PageWrapper title="💼 Profile">
        <div>
          <h1 className="textHeadings">Projects Contributing In:</h1>
          <div className="flex flex-col w-full gap-y-4 my-4">
            {enrolledProjects.map((project, idx) => {
              return <ProjectDiv key={idx} {...project} enrolled />;
            })}
          </div>
          <h1 className="textHeadings">Created Projects:</h1>

          <div className="flex flex-col w-full gap-y-4 my-4">
            {createdProjects.map((project, idx) => {
              return <ProjectDiv key={idx} {...project} enrolled />;
            })}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Profile;
