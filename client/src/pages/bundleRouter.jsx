import React from "react";
import BasicBundle from "./BasicBundle";
import { useParams } from "react-router-dom";

const BundleRouter = () => {
  const { id } = useParams();

  // Assign page theme based on ID
  let page = "page1"; // default
  if (id === "2") page = "page2"; // Intermediate
  else if (id === "3") page = "page3"; // Pro

  return <BasicBundle page={page} />;
};

export default BundleRouter;