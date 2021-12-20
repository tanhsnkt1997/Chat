import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

const ContactItem = ({ item, listContactId, setListContactId, userId }) => {
  const idOfOtherMe = item.userId === userId ? item.contactId : item.userId;
  const isChecked = listContactId.some((id) => id === idOfOtherMe);
  const changeCheckbox = (e) => {
    if (isChecked) {
      setListContactId((state) => state.filter((id) => id !== idOfOtherMe));
    } else {
      setListContactId((state) => [idOfOtherMe, ...state]);
    }
  };

  return (
    <li className="modalAdd__body_group_add_member_item_wraper">
      <div className="modalAdd__body_group_add_header" style={{ backgroundImage: `url(${item.contactAvatar})` }}></div>
      <div className="modalAdd__body_group_add_body">
        <span>{item.contactName}</span>
      </div>
      <div className="modalAdd__body_group_add_member_footer">
        <Checkbox checked={isChecked} onChange={changeCheckbox} color="primary" />
      </div>
    </li>
  );
};

export default React.memo(ContactItem);
