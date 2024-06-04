import React from 'react'
import { SyncLoader } from 'react-spinners';

// const override = {
//     span: '20px',
//     margin : '0 auto',
//     marginTop:'220px',
//     textAlign : 'center',
//     color : '#fff',
//     size : '20'
// };

const CLoading = ({loading }) =>{
    return (
        <div style={{ width : "1000px", height: "1000px" }}>
            <SyncLoader 
                loading ={loading}
                size={25}
                speedMultiplier={0.8}
                margin={5}
            />
            <div style = {{
                width : '100%',
                padding:'20px',
                color:'#000',
                fontWeight : '600',
            }}>
                <h2>Loading...</h2>
            </div>
        </div>
    )
}

export default CLoading;