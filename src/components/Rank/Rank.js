import React from 'react';
import './Rank.css'

const Rank = ({ name, entries }) => {
    return (
        <div>
            {`${name} , your current rank is...`}
            <div className='white f1 '>
                {entries}
            </div>
        </div>
    );
}

export default Rank;