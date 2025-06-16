import {SubmitHandler, useForm} from "react-hook-form";
import {NewStationInputs} from "../../schemas/NewStationInputs.ts";
import Axios, {AxiosError} from "axios";
import {FormTextInput} from "../../../../shared/components/form/FormTextInput.tsx";
import {Layer, Source} from "react-map-gl";

import {APIResponse} from "../../../types/APIResponse.ts";
import {useRef, useState} from "react";
import {GeoJSON} from "geojson";
import CustomMap from "../../../map/CustomMap.tsx";

import {point} from "@turf/turf";
import Checkbox from '@mui/material/Checkbox';
import {Box, Divider} from "@mui/material";
import Form from "../../../../shared/components/form/Form.tsx";
import {DialogFormRef} from "../../../types/DialogFormRef.ts";
import getRequiredLengthParams from "../../../../lib/getRequiredLengthParams.ts";

const latLonParams = {
  required: true,
  pattern: {
    value: /^-?\d+(\.\d+)?$/,
    message: 'Must be a valid number'
  }
};

const AddStationForm = () => {
  const form = useForm<NewStationInputs>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const {register, formState: {errors}, reset, subscribe, setValue} = form;

  const dialogRef = useRef<DialogFormRef>(null);

  const [rawLat, setRawLat] = useState<number>(0);
  const [rawLon, setRawLon] = useState<number>(0);
  const [stationPosition, setStationPosition] = useState<GeoJSON>({type: 'FeatureCollection', features: []});

  const [customNameSection, setCustomNameSection] = useState<boolean>(false);

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

  const onSubmit =
    (updateSnackbar?: (status: {
      error: boolean,
      message: string
    }) => void): SubmitHandler<NewStationInputs> => {
      return async (entryData): Promise<void> => {
        try {
          const response = await Axios.post<APIResponse>('http://localhost:3000/station/new', {
            ...entryData,
            active: false
          });
          const isSuccess = !response.data.data.error;

          if (updateSnackbar) {
            updateSnackbar({
              error: !isSuccess,
              message: !isSuccess ? response.data.data.message || 'Unspecified error occured' : 'New station created'
            });
          }

          reset();
          dialogRef.current?.close();

          return;
        } catch (e) {

          if (e instanceof AxiosError) {
            if (updateSnackbar) {
              updateSnackbar({
                error: true,
                message: e.response?.data?.data?.message || 'Failed to create new station'
              });
            }
            return;
          }

          if (updateSnackbar) {
            updateSnackbar({
              error: true,
              message: 'Unknown error occurred'
            });
          }
        }
        return;
      }
    };

  return <>
    <Form<NewStationInputs>
      label='Add new station'
      onSubmit={onSubmit}
      form={form}
      submitButton={{
        label: "Save",
        type: "submit"
      }}
      ref={dialogRef}
    >
      <div style={{display: 'flex', gap: '1rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
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
              register={register("lon", latLonParams)}
              value={rawLon}
            />
            <FormTextInput
              label="Lat"
              errorField={errors.lat}
              register={register("lat", latLonParams)}
              value={rawLat}
            />
          </div>
          <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
              <span style={{fontSize: '0.8rem'}}>Stop name is different</span>
              <Checkbox size='small' onChange={() => {
                setCustomNameSection(!customNameSection);
              }} />
            </div>
            <Box hidden={!customNameSection} sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <Divider />
              <FormTextInput
                label="Stop name"
                errorField={errors.stopName}
                register={register("stopName")}
              />
            </Box>
          </div>
        </div>
        <div>
          <CustomMap
            initialViewState={{
              longitude: 32.064470,
              latitude: 49.441325,
              zoom: 9
            }}
            style={{minWidth: '20rem'}}
            onClick={(e) => {
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
      </div>
    </Form>
  </>
}

export {AddStationForm}