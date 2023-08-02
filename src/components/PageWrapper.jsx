import Head from "next/head";
import { useEffect } from "react";

const PageWrapper = ({ children, title }) => {
  useEffect(() => {
    document.title = title || "DoGether";
  }, [title]);
  return (
    <>
      <div className="py-6 px-4 md:px-20 ">{children}</div>
    </>
  );
};

export default PageWrapper;
