import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  arrayUnion,
  getDoc,
  doc,
} from "firebase/firestore";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { TextField } from "@mui/material";

const Projects = () => {
  const Router = useRouter();
  const { isEnrolled } = Router.query;
  const [showConfirm, setShowConfirm] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };
  const [project, setProject] = useState(null);
  useEffect(() => {
    const projId = Router.query.id;
    const getProject = async () => {
      const projectRef = collection(db, "projects");
      const q = query(projectRef, where("projectId", "==", projId));
      const querySnapshot = await getDocs(q);

      setProject(querySnapshot.docs[0].data());
      console.log(querySnapshot.docs[0].data());
    };
    getProject();
  }, []);
  // const project = {
  //   name: "Test Project",
  //   duration:
  //     "A tentative delivery period of 4-8 weeks may be required to produce and supply 50 pots, on the condition that they are of medium size and complexity, and the artisan has access to the requisite resources, including a kiln.",
  //   members: [
  //     {
  //       name: "name here",
  //       uid: "fUO7UxBOXSZrtGXgZh7N98Y3mw82",
  //     },
  //   ],
  //   expectedPayment: "30,000",
  //   tags: ["web 3"],
  //   finalShipment: "Mumbai",
  //   desc: "Pottery making project involves molding and shaping clay to create functional or decorative objects such as bowls, vases, or sculptures. The process typically involves hand-building techniques or using a potter's wheel, followed by firing the pieces in a kiln to harden and finish them. It requires patience, creativity, and attention to detail.",
  //   projectId: "INI49xqpyPELtuXYaloM",
  //   createdBy: {
  //     uid: "fUO7UxBOXSZrtGXgZh7N98Y3mw82",
  //     name: "Shanti Devi ",
  //   },
  // };

  const Divider = () => {
    return <hr className="border-b border-gray-300 my-2" />;
  };
  const SemiSection = ({ title, children, className }) => {
    return (
      <div className={`flex flex-col gap-y-2 ${className}`}>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm font-extralight">{children}</p>
      </div>
    );
  };

  const handleStartProject = async () => {
    const projId = Router.query.id;
    const uid = JSON.parse(localStorage.getItem("user")).uid;
    console.log(uid);
    const user = await getDoc(doc(db, "userProfiles", uid));
    console.log(user.data());
    try {
      await setDoc(
        doc(db, "projects", projId),
        {
          members: arrayUnion({
            name: user.data().name,
            uid,
          }),
        },
        { merge: true }
      );
      Router.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <Link href="/home">
          <div className="flex item-center gap-x-3">
            <BiArrowBack className="self-center" />
            <h1>Back</h1>
          </div>
        </Link>
        <div>
          <div
            className={`flex flex-col gap-y-4  mt-4 ${
              isEnrolled ? "w-1/2" : "w-full"
            }`}
          >
            <div className="flex justify-between">
              <div className="flex gap-x-3 items-center">
                <h1 className="text-lg font-semibold">{project?.name}</h1>
                <div>
                  {project?.tags?.map((tag, idx) => {
                    return (
                      <h1 key={idx} className="tagClass">
                        {tag}
                      </h1>
                    );
                  })}
                </div>
              </div>
              {!isEnrolled && (
                <button
                  className="actionButton !rounded-md"
                  onClick={() => setShowConfirm(true)}
                >
                  Start Now
                </button>
              )}
            </div>
            <h1 className="flex items-center">
              Expected Payment:&nbsp;
              <span className="text-lg text-textHeading">
                Rs. {project?.expectedPayment}
              </span>
            </h1>
            <Divider />
            <SemiSection
              title="Description"
              className={`${!isEnrolled ? "w-3/4" : "w-full"}`}
            >
              {project?.desc}
            </SemiSection>
            <SemiSection title="Duration">{project?.duration}</SemiSection>
            <SemiSection title="Final Shipment">
              {project?.finalShipment}
            </SemiSection>
            <Divider />
            <SemiSection title="Project Posted By">
              {project?.createdBy.name}
            </SemiSection>
          </div>
          {isEnrolled && <div className="w-1/2"></div>}
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showConfirm}>
            <Box
              sx={style}
              className="rounded-md bg-primaryYellow p-4 w-[95vw] md:w-[50vw] h-[25vh] md:h-fit flex flex-col justify-center"
            >
              <h1 className="textHeadings text-center mb-8">Confirm Start</h1>
              <Box className="flex gap-x-4 justify-center items-center w-full">
                <button
                  className="actionButton rounded-md"
                  onClick={handleStartProject}
                >
                  Start
                </button>
                <button
                  className="underline underline-offset-2 text-textHeading"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </PageWrapper>
    </>
  );
};

export default Projects;
