import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import ProjectDiv from "@/components/ProjectDiv";
import { Divider } from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { db } from "../../../firebase";
import FuzzySearch from "fuzzy-search";
const Projects = ({ projects }) => {
  const [searchValue, setSearchValue] = useState("");
  console.log(projects);
  const searcher = new FuzzySearch(projects, ["name", "tags"], {
    caseSensitive: false,
    sort: true,
  });
  // var result = [
  //   ...searcher.search(searchValue),
  // ];
  // result = [...new Set(result)];
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
                placeholder="Search Tag / Project Name / Task"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-y-4">
            {result.length > 0 ? (
              result.map((project, idx) => {
                return <ProjectDiv key={idx} {...project} />;
              })
            ) : (
              <h1>
                No Projects Found with query query &ldquo;{searchValue}&rdquo;
              </h1>
            )}
          </div>
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
