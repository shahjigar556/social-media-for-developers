import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Alert(props) {
  const alerts = useSelector((state) => state.alert);
  if (alerts != null && alerts.length > 0) {
    return (
      <React.Fragment>
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id}>{alert.msg}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export default Alert;
