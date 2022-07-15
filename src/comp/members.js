import React from "react";
import './room.css'
function Members(prop) {



    return <div>
        <div className="chat_list">
            <div className="chat_people">
                <div className="chat_img "> <img className="rounded-circle"src={prop.newMembers.memberProfilePic} alt="sunil" /> </div>
                <div className="chat_ib">
                    <h5>{prop.newMembers.memberName}<span className="chat_date">Dec 25</span></h5>
                    <p>Test, which is a new approach to have all solutions
                        astrology under one roof.</p>
                </div>
            </div>
         </div>
    </div>
}
export default Members;