import { useEffect } from "react";
import { useRouter } from "next/router";
const NotFound = () => {
  const Router = useRouter();
  useEffect(() => {
    return () => Router.push("/");
  });
  return <></>;
};

export default NotFound;
