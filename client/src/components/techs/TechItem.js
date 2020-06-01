import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteTech } from "../../actions/techActions";
import M from "materialize-css/dist/js/materialize.min.js";

const TechItem = ({ tech, deleteTech }) => {
  const onDelete = () => {
    deleteTech(tech._id);
    M.toast({ html: `Tech deleted: ${tech.fullName}` });
  };

  return (
    <li className="collection-item">
      <div>
        {`${tech.fullName}`}
        <a href="#!" className="secondary-content" onClick={onDelete}>
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
};

export default connect(null, { deleteTech })(TechItem);
