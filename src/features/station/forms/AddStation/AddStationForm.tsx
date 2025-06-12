import {DialogFormContainer} from "../../../form/DialogFormContainer.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {NewStationInputs} from "../../schemas/NewStationInputs.ts";
import Axios from "axios";
import {FormTextInput} from "../../../../shared/components/FormTextInput.tsx";
import {FormValidationStatus} from "../../../types/FormValidationStatus.ts";
import {Layer, Source} from "react-map-gl";

import {APIResponse} from "../../../types/APIResponse.ts";
import {useState} from "react";
import {GeoJSON} from "geojson";
import CustomMap from "../../../map/CustomMap.tsx";

import './AddStationForm.css'
import {point} from "@turf/turf";

const getRequiredLengthParams = (label: string, length: number) => ({
  required: true,
  minLength: {
    value: length,
    message: `${label} must be at least 6 characters long`
  },
});

const AddStationForm = () => {
  const {register, handleSubmit, formState: {errors}, getValues, subscribe, setValue} = useForm<NewStationInputs>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const onSubmit: SubmitHandler<NewStationInputs> = (data) => console.log({data});

  const [rawLat, setRawLat] = useState<number>(0);
  const [rawLon, setRawLon] = useState<number>(0);
  const [stationPosition, setStationPosition] = useState<GeoJSON>({type: 'FeatureCollection', features: []});

  const updateStationPosition = (values: NewStationInputs) => {
    const newLon = Number(values.lon);
    const newLat = Number(values.lat);
    if (isNaN(newLat) || isNaN(newLon)) return;
    setStationPosition(point([newLon, newLat]));
    setRawLon(values.lon);
    setRawLat(values.lat)
  }

  subscribe({
    formState: {values: true},
    exact: true,
    callback: ({values}) => updateStationPosition(values)
  });

  const layerProps = {
    id: 'point',
    type: 'circle' as const,
    paint: {
      'circle-radius': 5,
      'circle-color': '#f23e5e'
    }
  };

  return <>
    <DialogFormContainer
      title="Add new station"
      className="add-station-form-container"
      buttons={{
        confirm: {
          label: 'Add',
          type: 'submit',
          handler: async (): Promise<FormValidationStatus> => {
            const submitHandler = handleSubmit(onSubmit);
            await submitHandler();

            const isInputValid = Object.keys(errors).length === 0;
            const values = getValues();

            return {isInputValid, values};
          }
        },
      }}
      onSubmit={async (entryData) => {
        const response = await Axios.post<APIResponse>('http://localhost:3000/', entryData)
        return response.data;
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', gap: '2rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem'}}>
          <FormTextInput
            label={"Name"}
            errorField={errors.name}
            register={register("name", getRequiredLengthParams('Station name', 6))}
          />
          <FormTextInput
            label="City"
            errorField={errors.city}
            register={register("city", getRequiredLengthParams('City', 6))}
          />
          <FormTextInput
            label="Region"
            errorField={errors.region}
            register={register("region", getRequiredLengthParams('Region', 6))}
          />
          <FormTextInput
            label="Street"
            errorField={errors.region}
            register={register("street")}
          />
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <FormTextInput
              label="Lon"
              errorField={errors.lon}
              register={register("lon", {
                required: true,
                pattern: {
                  value: /^-?\d+(\.\d+)?$/,
                  message: 'Must be a valid number'
                }
              })}
              value={rawLon}
            />
            <FormTextInput
              label="Lat"
              errorField={errors.lat}
              register={register("lat", {
                required: true,
                pattern: {
                  value: /^-?\d+(\.\d+)?$/,
                  message: 'Must be a valid number'
                }
              })}
              value={rawLat}
            />
          </div>
        </div>
        <div>
          <CustomMap
            initialViewState={{
              longitude: 32.064470,
              latitude: 49.441325,
              zoom: 9
            }}
            style={{
              minWidth: '20rem',
            }}
            onClick={(e) => {
              console.log(e.lngLat);
              const newLat = Number(e.lngLat.lat.toFixed(6));
              const newLon = Number(e.lngLat.lng.toFixed(6));
              setValue('lat', newLat);
              setValue('lon', newLon);
            }}
          >
            <Source type="geojson" data={stationPosition}>
              <Layer {...layerProps} />
            </Source>
          </CustomMap>
        </div>
      </form>
    </DialogFormContainer>
  </>
}

export {AddStationForm}