import React from "react";
import styled from "styled-components";

const MainGrid = styled.div`
  display: grid;
  grid-template-areas:
    "sidebargrid searchboxgrid logoutgrid"
    "sidebargrid newscontainergrid";
`;

const Sidebar = styled.div`
  grid-area: sidebargrid;
`;

const Searchbox = styled.div`
  grid-area: searchboxgrid;
`;

const Logoutgrid = styled.div`
  grid-area: logoutgrid;
`;

const Newscontainergrid = styled.div`
  grid-area: newscontainergrid;
`;

export default function Grid() {
  return <div></div>;
}
