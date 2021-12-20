const base = {
  easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  colorWhite: "rgb(255, 255, 255)",
  colorBlack: "rgb(0, 0, 0)",
};

const dark = {
  id: "dark",
  ...base,
  backgroundColor: "#1a2236",
  textColor: "#fff",
  navColor: "indianred",
  borderBase: "1.5px solid #fff",
};

const light = {
  id: "light",
  ...base,
  backgroundColor: "#f5f7fb",
  textColor: "#828ca0",
  navColor: "lightcoral",
  borderBase: "1.5px solid rgb(15 34 58 / 12%)",
};

export const theme = { dark, light };
