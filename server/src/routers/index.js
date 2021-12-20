import auth from "./auth.js";
import contact from "./contact.js";
import chatRoom from "./chatRoom.js";
import message from "./message.js";
import group from "./group.js";
import setting from "./setting.js";

const initRouter = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/contact", contact);
  app.use("/api/room", chatRoom);
  app.use("/api/message", message);
  app.use("/api/group", group);
  app.use("/api/setting", setting);
};

export default initRouter;
