import React from "react";

function BrandName() {
  const names = [
    `CodeLabz /`,
    `<CodeLabz />`,
    `{CodeLabz}`,
    `[CodeLabz,]`,
    `C0d3L@bz`,
  ];
  return <>{names[Math.floor(Math.random() * names.length)]}</>;
}

export default BrandName;
