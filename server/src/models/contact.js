import moongse from "mongoose";

const Contact = moongse.Schema(
  {
    userId: String, //is sent
    contactId: String, // receive
    status: { type: Boolean, default: false },
    message: { type: String },
  },
  { timestamps: true }
);

export default moongse.model("Contact", Contact);
