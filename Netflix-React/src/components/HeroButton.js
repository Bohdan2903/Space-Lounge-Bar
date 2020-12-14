import React from "react";

const HeroButton = (props) => {
    const icon = props.icon? <i className={props.icon}></i>: null;
    return (
        <a href="https://netflix.com" className="Button" data-primary={props.primary}>{icon}{props.text}</a>
    );
}

export default HeroButton;