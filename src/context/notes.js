import React from "react";
import noteContext from "./context";


const NoteState = (props) => {
    return (
        <NoteState.prvider>
            {props.children}
        </NoteState.prvider>
    )
}

export default NoteState;