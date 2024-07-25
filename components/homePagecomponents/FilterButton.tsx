import React from 'react'
import'./cssModules/FilterButton.css'

type FilterButttonProps={
    name:string;
    onClick:(event: React.MouseEvent<HTMLButtonElement>) => void;
    isActive: boolean;
};

const FilterButton: React.FC<FilterButttonProps> = ({ name, onClick,isActive})=>{
    return(
        <div id="b" className={`button-container ${isActive ? 'active' : ''}`} >
            <button onClick={onClick}>{name}</button>
        </div>
    );
};
export default FilterButton