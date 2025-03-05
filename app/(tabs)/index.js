// import {} from 'react-native'
// import React from 'react'
// import App from "@/App"

// const index = () => {
//   return (
//     <App/>
//   )
// }

// export default index




import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import App from '@/App';

const Index = () => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const getOrientation = async () => {
      const orientationInfo = await ScreenOrientation.getOrientationAsync();
      setOrientation(orientationInfo === 1 || orientationInfo === 2 ? 'portrait' : 'landscape');
    };

    ScreenOrientation.unlockAsync();

    const subscription = ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
      setOrientation(orientationInfo.orientation === 1 || orientationInfo === 2 ? 'portrait' : 'landscape');
    });

    getOrientation();

    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  return <App orientation={orientation} />;
};

export default Index;



