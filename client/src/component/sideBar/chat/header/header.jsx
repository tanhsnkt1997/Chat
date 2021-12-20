import React from "react";
import { Trans, translate, useTranslation } from "react-i18next";

import Search from "./search/search.jsx";
import Carousel from "./carousel/carousel";
import ButtonToggleNav from "../../base/buttonToggleNav.jsx";

const Header = ({ setOpenNavbar, openNavbar }) => {
  const { t } = useTranslation();
  return (
    <div className="sideBar__body_header_container">
      <ButtonToggleNav setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} />
      <h2 className="sideBar__header_title">
        {/* <Trans>chats</Trans> */}
        {t("chats")}
      </h2>
      <Search />
      <Carousel />
    </div>
  );
};

export default React.memo(Header);
