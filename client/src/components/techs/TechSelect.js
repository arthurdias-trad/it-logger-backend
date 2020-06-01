import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTechs } from "../../actions/techActions";

const TechSelect = ({ tech: { techs, loading }, getTechs }) => {
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <option value="" disabled>
        Select Technician
      </option>
      {!loading &&
        techs !== null &&
        techs.map((tech) => (
          <option
            key={tech._id}
            value={`${tech.fullName}`}
          >{`${tech.fullName}`}</option>
        ))}
    </>
  );
};

TechSelect.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechSelect);
