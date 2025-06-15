import {DialogFormContainer} from "../../../../shared/components/form/DialogFormContainer.tsx";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {NewRouteInputs} from "../../schemas/NewRouteInputs.ts";
import Axios from "axios";
import {FormValidationStatus} from "../../../types/FormValidationStatus.ts";

import {APIResponse} from "../../../types/APIResponse.ts";
import {useEffect, useState} from "react";
import {GeoJSON} from "geojson";
import CustomMap from "../../../map/CustomMap.tsx";

import {useQuery} from "@tanstack/react-query";
import {Button, Divider, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {Source, Layer} from "react-map-gl";
import {FormTextInput} from "../../../../shared/components/form/FormTextInput.tsx";
import AddIcon from '@mui/icons-material/Add';
import {TrainStopData} from "../../../trainStop/types/TrainStopData.ts";

const SelectTrainStop = ({stops, onChange, value, selectedIDs}: {
  stops: { rows: TrainStopData[] },
  onChange: (e: SelectChangeEvent) => void,
  value?: number,
  selectedIDs?: number[]
}) => {
  return <>
    <Select
      onChange={onChange}
      value={value}
      variant='standard'
      size='small'
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '12rem'
      }}
    >
      <MenuItem> None </MenuItem>
      {stops?.rows.map((stop) => {
        return (
          <MenuItem
            value={stop.id}
            key={stop.id}
            disabled={selectedIDs.includes(stop.id)}
          >
            {stop.id}: {stop.name}, {stop.stationCity}, {stop.stationRegion}
          </MenuItem>
        )
      })}
    </Select>
  </>
}

const NewRouteForm = () => {
  const {data: stops, refetch} = useQuery({
    queryKey: ['newStation_Stops'],
    queryFn: async () => {
      const response = await Axios.get<APIResponse>('http://localhost:3000/trainStop?include=station');
      return response.data.data as { rows: TrainStopData[], count: number } || [];
    },
    enabled: false
  });

  const {register, handleSubmit, formState: {errors}, getValues, subscribe, control} = useForm<NewRouteInputs>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const onSubmit: SubmitHandler<NewRouteInputs> = (data) => console.log({data});

  const {fields, append} = useFieldArray({
    control,
    name: 'stops'
  });

  const [selectedStations, setSelectedStations] = useState<GeoJSON>({type: "FeatureCollection", features: []})
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);

  useEffect(() => console.log({selectedStations}), [selectedStations]);

  subscribe({
    formState: {values: true},
    exact: true,
    callback: ({values}) => {
      if (values.stops) {
        const coords = values.stops.map((stop: number) => {
          return stops?.rows.find(row => row.id === stop)?.stopPosition || []
        });
        if (coords.at(-1)?.length === 0) return;
        setSelectedStations({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coords
          }
        });
        setSelectedIDs(values.stops);
      }
    }
  });

  const layerProps = {
    id: 'line',
    type: 'line' as const,
    paint: {
      'line-width': 3,
      'line-color': '#f23e5e'
    }
  };

  useEffect(() => {
    refetch()
  });

  return <>
    <DialogFormContainer
      title="New route"
      className="new-route-form-container"
      buttons={{
        confirm: {
          label: 'Create',
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
        const response = await Axios.post<APIResponse>('http://localhost:3000/routes/new', entryData)
        return response.data;
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', gap: '2rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem'}}>
          <FormTextInput label='Route name' register={register('name', {
            required: true,
            minLength: {
              value: 4,
              message: 'Route name must be at least 4 characters long'
            }
          })} />
          <Divider />
          <Typography>Stops on route</Typography>
          {fields.map((field, index) =>
            <Controller
              name={`stops.${index}`}
              render={({field: {onChange, value}}) =>
                <SelectTrainStop onChange={(e) => {
                  onChange(e.target.value)
                }} value={value} stops={stops || {rows: []}} selectedIDs={selectedIDs} />
              }
              control={control}
            />)
          }
          <Button onClick={() => append()}><AddIcon /></Button>
        </div>
        <div>
          <CustomMap
            initialViewState={{
              longitude: 32.064470,
              latitude: 49.441325,
              zoom: 9
            }}
            style={{minWidth: '20rem', minHeight: '25rem'}}
          >
            <Source type='geojson' data={selectedStations}>
              <Layer {...layerProps} />
            </Source>
          </CustomMap>
        </div>
      </form>
    </DialogFormContainer>
  </>
}

export {NewRouteForm}