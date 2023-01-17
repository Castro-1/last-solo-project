import React from "react";

export default function Option(props) {
  const { value } = props;
  return <div className="option">{value}</div>;
}
