import React from "react";
import ListToogle from "./ListToogle";
const Item = (props) => {
    return (
        <div className="Item" style={{background: `url(${props.background})`, backgroundSize: "contain", backgroundRepeat: 'no-repeat'}}>
           
            <div className="overlay">
                <div className="title">{props.name}</div>
                <div className="rating">{props.rating}</div>
                <div className="plot">{props.plot}</div>
                <ListToogle/>
            </div>
        </div>
    );
}

export default Item;