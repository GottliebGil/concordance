import React, {useState} from 'react';

type inputParams = {
    checked: boolean;
    onChange: CallableFunction;
    label: string
}

const Input: React.FC = ({checked, onChange, label}: inputParams) => {
    return (
        <label className={"flex flex-row gap-1"}>
            <input
                type={"checkbox"}
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    )
}

export default Input;