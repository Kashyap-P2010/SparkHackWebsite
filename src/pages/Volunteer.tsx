import React from "react";

type VolunteerList = {
    id: number;
    name: string;
}

const volunteers: VolunteerList[] = [
    { id: 1, name: "John Doe" },
]

function Volunteer() {
    return (
        <div className="container text-center py-5">
            <h1 style={{ marginTop : "50px", fontSize: '60px',fontWeight: '900',background: 'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',display: 'inline-block',}} >Volunteer Page</h1><br /><br /><br /><br />
            <p style={{color : "white"}}>Thank you for your interest in volunteering with us!</p>
        </div>
    );
}

export default Volunteer;
