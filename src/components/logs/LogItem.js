import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteLog } from "../../actions/logActions";

const LogItem = ({
  log: { attention, id, message, tech, date },
  deleteLog,
}) => {
  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-log-modal"
          className={`modal-trigger ${attention ? "red-text" : "blue-text"}`}
        >
          {message}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">ID #{id}</span> last updated by{" "}
          <span className="black-text">{tech}</span> on{" "}
          <Moment format="MMMM Do YYYY, h:mm:ss a">{date}</Moment>
        </span>
        <a
          href="#!"
          className="secondary-content"
          onClick={() => {
            deleteLog(id);
          }}
        >
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
};

export default connect(null, { deleteLog })(LogItem);
