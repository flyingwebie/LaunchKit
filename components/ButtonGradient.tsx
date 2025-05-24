"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ButtonGradient = ({
  title = "Gradient Button",
  onClick = () => {},
}: {
  title?: string;
  onClick?: () => void;
}) => {
  return (
    <Button className="btn-gradient animate-shimmer" onClick={onClick}>
      {title}
    </Button>
  );
};

export default ButtonGradient;
