import React from "react";

export default function ErrorNotice(props) {
    return (
        <div className="error-notice">
            <div style={{display:'flex'}}>
                <h5>{props.message}</h5>

            </div>


        </div>
    );
}