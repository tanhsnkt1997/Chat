import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import OnOutsiceClick from "react-outclick";

import LanguageIcon from "@material-ui/icons/Language";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import authActions from "../../../redux/action/index";
import "./Footer.css";

const languages = [
  { id: "en", value: "Eng" },
  { id: "vi", value: "Vi" },
];

const Footer = ({ setIsDark }) => {
  const [showChangeLanguage, setShowChangeLanguage] = useState(false);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  console.log("i18n.languagei18n.languagei18n.language", i18n.language);

  const logout = () => {
    dispatch(authActions.logout());
  };

  const darkMode = () => {
    setIsDark((state) => !state);
    const isDark = localStorage.getItem("theme") === "dark";
    if (!isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  const showModalLanguage = () => {
    setShowChangeLanguage((state) => !state);
    // i18n.changeLanguage();
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="navBar__footer_container">
      <ul className="navBar__footer_list">
        <li className="navBar__footer_item" style={{ position: "relative" }}>
          <i>
            <LanguageIcon className="navBar__footer_item_logo" onClick={showModalLanguage} />
          </i>
          {showChangeLanguage && (
            <OnOutsiceClick
              onOutsideClick={() => {
                setShowChangeLanguage(false);
              }}
            >
              <ul className="navBar__footer_modal_change_language">
                {languages.map((language, index) => (
                  <li
                    key={index}
                    className={`navBar__footer_modal_change_language_item ${
                      i18n.language === language.id ? "navBar__footer_modal_change_language_item_active" : ""
                    }`}
                    onClick={() => handleChangeLanguage(language.id)}
                  >
                    {language.value}
                  </li>
                ))}
              </ul>
            </OnOutsiceClick>
          )}
        </li>
        <li className="navBar__footer_item" onClick={darkMode}>
          <i>
            <Brightness4Icon className="navBar__footer_item_logo" />
          </i>
        </li>
        <li className="navBar__footer_item" onClick={logout}>
          <i>
            <ExitToAppIcon className="navBar__footer_item_logo" />
          </i>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(Footer);
