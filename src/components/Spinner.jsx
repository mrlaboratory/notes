import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className='flex justify-center my-10'>
            <PropagateLoader color="#36d7b7" />
        </div>
    );
};

export default Spinner;