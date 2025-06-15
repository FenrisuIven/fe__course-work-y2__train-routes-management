import {SubmitHandler, useForm} from "react-hook-form";
import {NewTrainInputs} from "../schemas/NewTrainInputs.ts";
import {useQuery} from "@tanstack/react-query";
import Axios, {AxiosError} from "axios";
import {FormSelect} from "../../../shared/components/form/FormSelect.tsx";
import {FormTextInput} from "../../../shared/components/form/FormTextInput.tsx";
import {APIResponse} from "../../types/APIResponse.ts";
import {useRef} from "react";
import {DialogFormRef} from "../../types/DialogFormRef.ts";
import {VoyageData} from "../../voyage/types/VoyageData.ts";
import Form from "../../../shared/components/form/Form.tsx";

const AddTrainForm = () => {
  const form = useForm<NewTrainInputs>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const {register, formState: {errors}, reset} = form;

  const dialogRef = useRef<DialogFormRef>(null);

  const {data: voyages} = useQuery({
    queryKey: ['addTrain_voyageIDs'],
    queryFn: async () => {
      const response = await Axios.get<APIResponse<VoyageData>>('http://localhost:3000/voyage');
      return response.data.data?.rows;
    }
  });

  const onSubmit =
    (updateSnackbar?: (status: {
      error: boolean,
      message: string
    }) => void): SubmitHandler<NewTrainInputs> => {
      return async (entryData): Promise<void> => {
        try {
          const response = await Axios.post<APIResponse>('http://localhost:3000/train/new', {
            ...entryData,
            active: false
          });
          const isSuccess = !response.data.data.error;

          if (updateSnackbar) {
            updateSnackbar({
              error: !isSuccess,
              message: !isSuccess ? response.data.data.message || 'Unspecified error occured' : 'New train created'
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
                message: e.response?.data?.data?.message || 'Failed to create new train'
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
      <Form<NewTrainInputs>
        onSubmit={onSubmit}
        form={form}
        submitButton={{
          label: "Save",
          type: "submit"
        }}
        ref={dialogRef}
      >
        <FormTextInput
          label={"Train Name"}
          errorField={errors.name}
          register={register("name", {
            required: true,
            minLength: {
              value: 4,
              message: 'Train name must be at least 4 characters long'
            },
          })}
        />
        <FormTextInput
          label="Serial of new tracker"
          inputMask="****-****-****-****"
          errorField={errors.trackerSerial}
          register={register("trackerSerial", {
            required: true,
            minLength: {
              value: 19,
              message: 'Tracker serial must be at least 15 characters long'
            }
          })}
        />
        <FormSelect
          options={voyages}
          label="Voyage"
          id="voyage-id"
          optionsKeyBase="addTrain_voyageId"
          registerProps={register('voyageID')}
        />
      </Form>
    </>
  );
};

export {AddTrainForm}