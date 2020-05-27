import React, { useState, useEffect } from "react";
import TechItem from "./TechItem";

const TechListModal = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  const getTechs = async () => {
    setLoading(true);
    const res = await fetch("/techs");

    setTechs(await res.json());

    setLoading(false);
  };

  return (
    <div>
      <div id="tech-list-modal" className="modal">
        <div className="modal-content">
          <ul className="collection with-header">
            <li className="collection-header">
              <h4 className="center">Technician List</h4>
            </li>
            {!loading &&
              techs.map((tech) => {
                return <TechItem tech={tech} key={tech.id} />;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechListModal;
