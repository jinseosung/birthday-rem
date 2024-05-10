import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const MessageContainer = ({ message }) => {
  return (
    <div key={message.id} className="messageContainer">
      <div className="messageContainer__top">
        <div className="messageContainer__title">
          <FontAwesomeIcon
            icon={faComment}
            className="messageContainer__icon"
          />
          <span className="messageContainer__name">{message.name}</span>
        </div>
        <span className="messageContainer__date">
          {`${message.dateObj.hours}:${message.dateObj.minutes}, ${message.dateObj.day} ${message.dateObj.month}`}
        </span>
      </div>
      <div className="messageContainer__bottom">
        <span className="messageContainer__message">{message.message}</span>
      </div>
    </div>
  );
};

export default MessageContainer;
