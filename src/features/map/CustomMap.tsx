import Map from "react-map-gl";
import {CSSProperties, PropsWithChildren} from "react";

const CustomMap = ({children, style, initialViewState}: {
  style?: CSSProperties,
  initialViewState?: {
    longitude: number,
    latitude: number,
    zoom: number
  }
} & PropsWithChildren) => {
  return <>
    <Map
      mapboxAccessToken="pk.eyJ1IjoiZmVucmlzdWx2ZW4iLCJhIjoiY21iN3o3ZHExMDc4MTJrc2JiOGFmaDA1MiJ9.eSPe52_A7Sxt5-xK6DW5CQ"
      initialViewState={initialViewState}
      style={style}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {children}
    </Map>
  </>
}

export default CustomMap