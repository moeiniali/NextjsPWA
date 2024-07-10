import React, { Component } from 'react';
import { MlCounter } from '../../exAllCo';
// import Icon from 'react-multi-date-picker/components/icon';

const OrgCounter = ({ icon_I, icon_II, icon_III, counter_I, counter_II, counter_III,
 title_I, title_II, title_III, alt_I, alt_II, alt_III, widthI, widthII, widthIII, heightI, heightII, heightIII }) => {


 return (<>
  <div dir='rtl' className='flex flex-row  gap-2 my-8  '>
   <MlCounter src={icon_I} alt={alt_I} title={title_I} counter={counter_I} />
   <MlCounter src={icon_II} alt={alt_II} title={title_II} counter={counter_II} />
   <MlCounter src={icon_III} alt={alt_III} title={title_III} counter={counter_III} />
  </div>
 </>);
}


export default OrgCounter;