import React from "react";

// TODO: Complete the Button type
type ButtonProps {
    onClick: () => {};

}

const Button: React.FC = (onClick, isDisabled) => {
    return (
        <button className={"cursor-pointer border"} onClick={getAllSongs} disabled={isLoading}>GET ALL</button>
    )
}