import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppsIcon from "@material-ui/icons/Apps";
import styled from "styled-components";

const ButtonToggleNav = ({ setOpenNavbar, openNavbar }) => {
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ButtonToggleNavStyle
      matchesDownSm={matchesDownSm}
      openNavbar={openNavbar}
      onClick={() => setOpenNavbar((state) => !state)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: openNavbar ? "rgb(28, 157, 234)" : "rgba(0, 0, 0, 0.3)",
          borderRadius: "50%",
          padding: "5px",
        }}
      >
        <AppsIcon style={{ color: "#fff" }} />
      </div>
    </ButtonToggleNavStyle>
  );
};

const ButtonToggleNavStyle = styled.div`
  display: ${(props) => (props.matchesDownSm ? "flex" : "none")};
  justify-content: flex-end;
  align-items: center;
`;

export default React.memo(ButtonToggleNav);
