import Map from "react-map-gl";
import {CSSProperties, PropsWithChildren} from "react";
import {MapLayerMouseEvent} from "mapbox-gl";

const CustomMap = ({children, style, initialViewState, onClick}: {
  style?: CSSProperties,
  initialViewState?: {
    longitude: number,
    latitude: number,
    zoom: number
  },
  onClick?: (e: MapLayerMouseEvent) => void
} & PropsWithChildren) => {
  return <>
    <Map
      mapboxAccessToken="pk.eyJ1IjoiZmVucmlzdWx2ZW4iLCJhIjoiY21iN3o3ZHExMDc4MTJrc2JiOGFmaDA1MiJ9.eSPe52_A7Sxt5-xK6DW5CQ"
      initialViewState={initialViewState}
      style={style}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onClick={onClick}
    >
      {children}
    </Map>
  </>
}

export default CustomMap