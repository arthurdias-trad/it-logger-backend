import React, { useEffect } from "react";
import TechItem from "./TechItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTechs } from "../../actions/techActions";

const TechListModal = ({ tech: { techs, loading }, getTechs }) => {
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div id="tech-list-modal" className="modal">
        <div className="modal-content">
          <ul className="collection with-header">
            <li className="collection-header">
              <h4 className="center">Technician List</h4>
            </li>
            {!loading &&
              techs !== null &&
              techs.map((tech) => {
                return <TechItem tech={tech} key={tech._id} />;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
