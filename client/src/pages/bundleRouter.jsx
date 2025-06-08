import React from "react";
import BasicBundle from "./BasicBundle";
import IntermediateBundle from "./IntermediateBundle";
import AdvanceBundle from "./AdvanceBundle";
import { useParams } from "react-router-dom";

const BundleRouter = () => {
  const { id } = useParams();
  const { level } = useParams();

  // Assign page theme based on ID

  if (level === "basicBundle") {
    return <BasicBundle page="page1" id={id} />;
  } else if (level === "intermediateBundle") {
    return <IntermediateBundle page="page2" id={id} />; // Intermediate
  } else if (level === "advanceBundle") {
    return <AdvanceBundle page="page3" id={id} />; // Advance
  } 
}

export default BundleRouter;