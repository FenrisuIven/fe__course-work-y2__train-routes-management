import {DialogFormContainer} from "../../form/DialogFormContainer.tsx";
import './testMapBox.css'

import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const TempViewStationPos = () => {
  return <>
    <DialogFormContainer className='test-map-box'>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiZmVucmlzdWx2ZW4iLCJhIjoiY21iNWdpeGp3MjVrdjJqcXVibGRlbXVzZSJ9.aQuGM8llZfOyU0yF2dRD_g"
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5
        }}
        style={{minWidth: '32rem', minHeight: '47rem'}}
        mapStyle="mapbox://styles/fenrisulven/cmb5gv7qq00lj01qx9l8d1r9q/draft"
      />
    </DialogFormContainer>
  </>
};

export {TempViewStationPos}