import {useForm, SubmitHandler, Controller} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import Axios, {AxiosError} from "axios";
import {useRef} from "react";
import {FormSelect} from "../../../../shared/components/form/FormSelect.tsx";
import {FormTextInput} from "../../../../shared/components/form/FormTextInput.tsx";
import {NewVoyageInputs} from "../../schemas/NewVoyageInputs.ts";
import {Train} from "../../../train/types/TrainData.ts";
import {Route} from "../../../routes/types/RouteData.ts";
import {APIResponse} from "../../../types/APIResponse.ts";
import Form from "../../../../shared/components/form/Form.tsx";
import {DialogFormRef} from "../../../types/DialogFormRef.ts";

const NewVoyageForm = () => {
  const form = useForm<NewVoyageInputs>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const {register, formState: {errors}, reset, control} = form;

  const dialogRef = useRef<DialogFormRef>(null);

  const {data: trains} = useQuery({
    queryKey: ['newVoyage_trains'],
    queryFn: async () => {
      const res = await Axios.get<APIResponse<Train>>('http://localhost:3000/train');
      return res.data.data.rows.filter(train => train.voyageID === null);
    }
  });

  const {data: routes} = useQuery({
    queryKey: ['newVoyage_routes'],
    queryFn: async () => {
      const res = await Axios.get<APIResponse<Route>>('http://localhost:3000/routes/free');
      return res.data.data.rows;
    }
  });

  const onSubmit =
    (updateSnackbar?: (status: {
      error: boolean,
      message: string
    }) => void): SubmitHandler<NewVoyageInputs> => {
      return async (entryData): Promise<void> => {
        try {
          const response = await Axios.post<APIResponse>('http://localhost:3000/voyage/new', entryData);
          const isSuccess = !response.data.data.error;

          if (updateSnackbar) {
            updateSnackbar({
              error: !isSuccess,
              message: !isSuccess ? response.data.data.message || 'Unspecified error occured' : 'New voyage created'
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
                message: e.response?.data?.data?.message || 'Failed to create new voyage'
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

  return (
    <>
      <Form<NewVoyageInputs>
        onSubmit={onSubmit}
        form={form}
        submitButton={{
          label: "Add",
          type: "submit"
        }}
        ref={dialogRef}
      >
        <FormTextInput
          label="Voyage Name"
          errorField={errors.name}
          register={register("name", {
            required: true,
            minLength: {
              value: 3,
              message: "Voyage name must be at least 3 characters long"
            }
          })}
        />
        <FormSelect
          options={routes}
          label="Route"
          id="route-id"
          optionsKeyBase="newVoyage_routeID"
          registerProps={register('routeID', {required: true})}
        />
        <Controller
          name='trainIDs'
          control={control}
          defaultValue={[]}
          render={({field}) => {
            return <FormSelect
              options={trains}
              label="Assign Trains"
              id="train-ids"
              optionsKeyBase="newVoyage_trainIDs"
              controllerField={field}
              multiple
            />
          }}
        />
      </Form>
    </>
  );
};

export {NewVoyageForm}