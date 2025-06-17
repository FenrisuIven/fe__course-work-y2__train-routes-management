import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {NewRouteInputs} from "../../schemas/NewRouteInputs.ts";
import Axios, {AxiosError} from "axios";

import {APIResponse} from "../../../types/APIResponse.ts";
import {useEffect, useRef, useState} from "react";
import {GeoJSON} from "geojson";
import CustomMap from "../../../map/CustomMap.tsx";

import {useQuery} from "@tanstack/react-query";
import {Button, Divider, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {Source, Layer} from "react-map-gl";
import {FormTextInput} from "../../../../shared/components/form/FormTextInput.tsx";
import AddIcon from '@mui/icons-material/Add';
import {TrainStopData} from "../../../trainStop/types/TrainStopData.ts";
import Form from "../../../../shared/components/form/Form.tsx";
import {DialogFormRef} from "../../../types/DialogFormRef.ts";
import getRequiredLengthParams from "../../../../lib/getRequiredLengthParams.ts";

const SelectTrainStop = ({stops, onChange, value, selectedIDs}: {
  stops: { rows: TrainStopData[] },
  onChange: (e: SelectChangeEvent) => void,
  value?: { id: number },
  selectedIDs?: { id: number }[]
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
            disabled={selectedIDs?.some(selected => selected.id === stop.id)}
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

  const form = useForm<NewRouteInputs>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const {register, subscribe, control, reset, formState: {errors}} = form;

  const dialogRef = useRef<DialogFormRef>(null);

  const {fields, append} = useFieldArray({
    control,
    name: 'stopIDs',
    rules: {
      minLength: 3
    }
  });

  const [selectedStations, setSelectedStations] = useState<GeoJSON>({type: "FeatureCollection", features: []})
  const [selectedIDs, setSelectedIDs] = useState<{ id: number }[]>([]);

  useEffect(() => console.log({selectedStations}), [selectedStations]);

  subscribe({
    formState: {values: true},
    exact: true,
    callback: ({values}) => {
      if (values.stopIDs) {
        const coords = values.stopIDs.map((stop) => {
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
        setSelectedIDs(values.stopIDs);
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

  const onSubmit =
    (updateSnackbar?: (status: {
      error: boolean,
      message: string
    }) => void): SubmitHandler<NewRouteInputs> => {
      return async (entryData): Promise<void> => {
        console.log({entryData})
        try {
          const response = await Axios.post<APIResponse>('http://localhost:3000/routes/new', {
            ...entryData,
            active: false
          });
          const isSuccess = !response.data.data.error;

          if (updateSnackbar) {
            updateSnackbar({
              error: !isSuccess,
              message: !isSuccess ? response.data.data.message || 'Unspecified error occured' : 'New route created'
            });
          }

          reset();
          dialogRef.current?.close();

          return;
        } catch (e) {
          console.log({e})
          if (e instanceof AxiosError) {
            if (updateSnackbar) {
              updateSnackbar({
                error: true,
                message: e.response?.data?.data?.message || 'Failed to create new route'
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
    <Form<NewRouteInputs>
      label='Add new route'
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
            label='Route name'
            register={register('name', getRequiredLengthParams('Route', 4))}
            errorField={errors.name}
          />
          <Divider />
          <Typography>Stops on route</Typography>
          {errors.stopIDs && <Typography color='error' fontSize='0.8rem'>At least 3 stops are required</Typography>}
          {fields.map((_field, index) =>
            <Controller
              name={`stopIDs.${index}`}
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
      </div>
    </Form>
  </>
}

export {NewRouteForm}