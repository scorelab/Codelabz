import React from "react";

function BrandName() {
  const names = [
    `CodeLabz /`,
    `<CodeLabz />`,
    `{CodeLabz}`,
    `[CodeLabz,]`,
    `C0d3L@bz`,
    `CodeLabz.`,
    `<CodeLabz>`,
  ];

  return <>{names[new Date().getHours() % names.length]}</>;
}

export default BrandName;
