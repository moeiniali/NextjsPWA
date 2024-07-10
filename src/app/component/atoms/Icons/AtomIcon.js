import React, { Component } from 'react';
import '../Atom.css';


const AtomIcon = (props) => {
    return (<>
        <img {...props}
        width={props.width}
        height={props.height}
        // src={props.src}
        //     alt={props.alt}
        //     className={props.className}
        // width={props.width}
        // height={props.height}
        //     accessKey={props.accessKey}
        //     defaultValue={props.defaultValue}
        //     onClick={props.onClick}
        />
    </>);
}

export default AtomIcon;