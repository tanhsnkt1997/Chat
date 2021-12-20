const onCloseTab = () => {
  window.opener = null;
  window.open("", "_self");
  window.close();
};

export default onCloseTab;
