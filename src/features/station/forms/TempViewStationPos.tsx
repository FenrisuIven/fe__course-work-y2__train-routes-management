import {DialogFormContainer} from "../../form/DialogFormContainer.tsx";
import './testMapBox.css'

import Map, {Source, Layer} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import {APIResponse} from "../../types/APIResponse.ts";
import {useEffect} from "react";


const TempViewStationPos = () => {
  const {data: testStop, isLoading} = useQuery({
    queryKey: ['testStop'],
    queryFn: async () => {
      const response = await Axios.get<APIResponse>('http://localhost:3000/trainstop?include=station');
      console.log({response})
      return response?.data?.data.rows[2];
    }
  });

  useEffect(() => {
    console.log({testStop})
  }, [testStop]);

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [testStop?.stopPosition[0], testStop?.stopPosition[1]]
        },
        properties: {title: '915 Front Street, San Francisco, California'}
      }
    ]
  };

  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };

  return <>
    {!isLoading && <DialogFormContainer className='test-map-box'>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiZmVucmlzdWx2ZW4iLCJhIjoiY21iNWdpeGp3MjVrdjJqcXVibGRlbXVzZSJ9.aQuGM8llZfOyU0yF2dRD_g"
        initialViewState={{
          longitude: testStop?.stopPosition[0],
          latitude: testStop?.stopPosition[1],
          zoom: 9
        }}
        style={{minWidth: '32rem', minHeight: '47rem'}}
        mapStyle="mapbox://styles/fenrisulven/cmb5gv7qq00lj01qx9l8d1r9q/draft"
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </DialogFormContainer>}
  </>
};

export {TempViewStationPos}