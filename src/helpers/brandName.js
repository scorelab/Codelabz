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
    `CoDeLaBz`,
    `Codel@bz`,
    '${Codelabz}',
    `3o45l12z`,    //a-> 1, c-> 3, d-> 4, e-> 5
  ];

  return <>{names[new Date().getHours() % names.length]}</>;
}

export default BrandName;
