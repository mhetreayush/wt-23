import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import ProjectDiv from "@/components/ProjectDiv";
import { Divider } from "@mui/material";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { db } from "../../../firebase";
import FuzzySearch from "fuzzy-search";
import CreateProfileModal from "@/components/CreateProfileModal";
const Projects = ({ projects }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const searcher = new FuzzySearch(projects, ["name", "tags"], {
    caseSensitive: false,
    sort: true,
  });
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user")));
  });
  var result = searcher.search(searchValue);
  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="flex min-h-screen gap-y-4 flex-col">
          <div>
            <h1 className="textHeadings mb-10">Search Projects</h1>
            <div className="relative  rounded-md p-2 pl-10 border border-primaryOrange flex items-center">
              <BsSearch className="absolute left-2 " />
              <input
                className="w-full"
                style={{ outline: "none", backgroundColor: "transparent" }}
                placeholder="Search Tag / Project Name"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-y-4">
            {result.length > 0 ? (
              result.map((project, idx) => {
                return (
                  <ProjectDiv
                    key={idx}
                    {...project}
                    setSelectedProject={setSelectedProject}
                    setOpenModal={setOpenModal}
                    selectedProject={selectedProject}
                  />
                );
              })
            ) : (
              <h1>
                No Projects Found with query query &ldquo;{searchValue}&rdquo;
              </h1>
            )}
          </div>
          {openModal && (
            <CreateProfileModal
              setOpenModal={setOpenModal}
              openModal={openModal}
              project={selectedProject}
            />
          )}
        </div>
      </PageWrapper>
    </>
  );
};

export default Projects;

export const getServerSideProps = async () => {
  const projectRef = collection(db, "projects");
  const querySnapshot = await getDocs(projectRef);
  return {
    props: {
      projects: querySnapshot.docs.map((doc) => doc.data()),
    },
  };
};
