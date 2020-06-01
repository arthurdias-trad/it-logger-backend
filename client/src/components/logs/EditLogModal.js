import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from "prop-types";
import { updateLog } from "../../actions/logActions";
import TechSelect from "../techs/TechSelect";

const EditLogModal = ({ log: { current }, updateLog }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    if (!message || !tech) {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      const uptLog = { id: current._id, message, attention, tech };
      updateLog(uptLog);

      // Clear fields
      setMessage("");
      setAttention(false);
      setTech("");
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={(e) => setTech(e.target.value)}
            >
              <TechSelect />
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={() => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          className="modal-close waves-effect blue btn"
          onClick={onSubmit}
        >
          ENTER
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "75%",
  height: "max(60%, 600px)",
};

EditLogModal.propTypes = {
  log: PropTypes.object.isRequired,
  updateLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
