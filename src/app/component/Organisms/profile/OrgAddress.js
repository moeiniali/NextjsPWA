import React, { useEffect, useRef, useState } from 'react';
import { AtomInput, AtomText, OrgHeader } from '../../exAllCo';
import { useDispatch, useSelector } from 'react-redux';
import iconMarker from '../../../assets/images/profile/arrow-left.svg'
import NeshanMap, { NeshanMapRef } from '@neshan-maps-platform/react-openlayers';
import { useNavigate } from 'react-router-dom';


const OrgAddress = () => {
  const [apiKey] = useState("web.6a151cd5e21d440baefab36a713950b6");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profileSlice.profile)
  const mapRef = useRef(null)


  return (
    <>
      <OrgHeader HeaderTitle="آدرس های من" goBackRout={() => navigate('/profile')} />

      <div className='w-full h-auto border border-[#AACBFF] rounded-xl'>
        <NeshanMap
          mapKey={apiKey}
          center={{
            latitude: profile[9] && profile[9].keyData,
            longitude: profile[10] && profile[10].keyData,
          }}
          style={{ height: "30vh", width: "100%", padding: '16px' }}
          zoom={17}
          ref={mapRef}
          traffic={true}
          poi={true}
          marker={iconMarker}
        ></NeshanMap>
        <div className='text-right p-4'>
          <AtomText title=":آدرس " className="font-bold text-sm " />
          <AtomText title={profile[4] ? profile[4].keyData : 'خطا در بارگذاری آدرس'} />
        </div>
      </div >
    </>
  );
}

export default OrgAddress;