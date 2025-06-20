import {DialogFormContainer} from "../../../../shared/components/form/DialogFormContainer.tsx";
import './testMapBox.css'

import Map, {Source, Layer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import {APIResponse} from "../../../types/APIResponse.ts";
import {useEffect} from "react";
import {GeoJSON} from 'geojson';

const TempViewStationPos = () => {
  const {data: stops, isLoading} = useQuery({
    queryKey: ['testStop'],
    queryFn: async () => {
      const response = await Axios.get<APIResponse>('http://localhost:3000/trainstop?include=station');
      console.log({response})
      return response?.data?.data.rows as { type: string, stopPosition: number[] }[];
    }
  });

  const geojson: GeoJSON = {
    type: 'FeatureCollection',
    features:
      stops?.filter(stop => Boolean(stop) && Boolean(stop.stopPosition))
        .map(stop => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: stop?.stopPosition || []
            },
            properties: {}
          })
        ) || []
  };

  const layerStyle = {
    id: 'point',
    type: 'circle' as const,
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };

  return <>
    {!isLoading &&
      <DialogFormContainer title='See all stations' className='test-map-box'>
        <Map
          mapboxAccessToken="pk.eyJ1IjoiZmVucmlzdWx2ZW4iLCJhIjoiY21iN3o3ZHExMDc4MTJrc2JiOGFmaDA1MiJ9.eSPe52_A7Sxt5-xK6DW5CQ"
          initialViewState={{
            longitude: 32.064470,
            latitude: 49.441325,
            zoom: 9
          }}
          style={{minWidth: '32rem', minHeight: '45rem'}}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          interactiveLayerIds={['building']}
          onClick={(e) => {
            console.log({e, features: e.features})
          }}
        >
          <Source id='my-data' type='geojson' data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
      </DialogFormContainer>}
  </>
};

export {TempViewStationPos}