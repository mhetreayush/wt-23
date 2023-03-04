import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
const Projects = () => {
  const Router = useRouter();
  // const [project, setProject] = useState(null);
  // useEffect(() => {
  //   const projId = Router.query.id;
  //   const getProject = async () => {
  //     const projectRef = collection(db, "projects");
  //     const q = query(projectRef, where("projectId", "==", projId));
  //     const querySnapshot = await getDocs(q);

  //     setProject(querySnapshot.docs[0].data());
  //     console.log(querySnapshot.docs[0].data());
  //   };
  //   getProject();
  // }, []);
  const project = {
    name: "Test Project",
    duration:
      "A tentative delivery period of 4-8 weeks may be required to produce and supply 50 pots, on the condition that they are of medium size and complexity, and the artisan has access to the requisite resources, including a kiln.",
    members: [
      {
        name: "name here",
        uid: "fUO7UxBOXSZrtGXgZh7N98Y3mw82",
      },
    ],
    expectedPayment: "30,000",
    tags: ["web 3"],
    finalShipment: "Mumbai",
    desc: "Pottery making project involves molding and shaping clay to create functional or decorative objects such as bowls, vases, or sculptures. The process typically involves hand-building techniques or using a potter's wheel, followed by firing the pieces in a kiln to harden and finish them. It requires patience, creativity, and attention to detail.",
    projectId: "INI49xqpyPELtuXYaloM",
    createdBy: {
      uid: "fUO7UxBOXSZrtGXgZh7N98Y3mw82",
      name: "Shanti Devi ",
    },
  };

  const Divider = () => {
    return <hr className="border-b border-gray-300 my-2" />;
  };
  const SemiSection = ({ title, children }) => {
    return (
      <div className="flex flex-col gap-y-2">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm font-extralight">{children}</p>
      </div>
    );
  };
  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="flex flex-col gap-y-4">
          <Link href="/projects">Back</Link>
          <div className="flex justify-between">
            <div className="flex gap-x-3 items-center">
              <h1 className="text-lg font-semibold">{project?.name}</h1>
              <div>
                {project?.tags.map((tag, idx) => {
                  return (
                    <h1 key={idx} className="tagClass">
                      {tag}
                    </h1>
                  );
                })}
              </div>
            </div>
            <div className="actionButton !rounded-md">Start Now</div>
          </div>
          <h1 className="flex items-center">
            Expected Payment:&nbsp;
            <span className="text-lg text-textHeading">
              Rs. {project?.expectedPayment}
            </span>
          </h1>
          <Divider />
          <SemiSection title="Description">{project?.desc}</SemiSection>
          <SemiSection title="Duration">{project?.duration}</SemiSection>
          <SemiSection title="Final Shipment">
            {project?.finalShipment}
          </SemiSection>
          <Divider />
          <SemiSection title="Project Posted By">
            {project?.createdBy.name}
          </SemiSection>
        </div>
      </PageWrapper>
    </>
  );
};

export default Projects;
