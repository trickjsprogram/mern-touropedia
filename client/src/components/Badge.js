import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

const Badge = ({ children }) => {
  const colorKey = {
    Sea: "primary",
    Beach: "success",
    Temple: "danger",
    Hill: "warning",
    Historic: "info",
  };
  return (
    <h5 className="mt-1">
      <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  );
};

export default Badge;
