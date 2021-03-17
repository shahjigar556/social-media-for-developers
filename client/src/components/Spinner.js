import React from 'react'
import spinner from '../img/spinner.gif';
function Spinner() {
    return (
        <React.Fragment>
            <center>
                <img src={spinner} alt="spinner" height="200" width="200" />
            </center>
        </React.Fragment>
    )
}

export default Spinner
