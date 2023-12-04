// import React, { useState } from 'react';
// import AgoraUIKit from 'agora-react-uikit';

// const App = () => {
//     const [videoCall, setVideoCall] = useState(false);
//     const rtcProps = {
//         appId: '1b1399d5e3e34c3397421642602e1fe3',
//         channel: 'junaid', // your agora channel
//         // token: '<Your channel Token>' // use null or skip if using app in testing mode
//         enableScreensharing: true
//     };
//     const callbacks = {
//         EndCall: () => setVideoCall(false),
//     };
//     return videoCall ? (
//         <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
//             <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
//         </div>
//     ) : (
//         <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
//     );
// };

// export default App;

