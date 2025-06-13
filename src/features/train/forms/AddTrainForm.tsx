import {DialogFormContainer} from "../../../shared/components/form/DialogFormContainer.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {NewTrainInputs} from "../schemas/NewTrainInputs.ts";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import {useEffect} from "react";
import {FormSelect} from "../../../shared/components/form/FormSelect.tsx";
import {FormTextInput} from "../../../shared/components/form/FormTextInput.tsx";
import {FormValidationStatus} from "../../types/FormValidationStatus.ts";

import './AddTrainForm.css'
import {VoyageData} from "../../voyage/types/VoyageData.ts";
import {APIResponse} from "../../types/APIResponse.ts";

const AddTrainForm = () => {
  const {register, handleSubmit, formState: {errors}, getValues} = useForm<NewTrainInputs>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const onSubmit: SubmitHandler<NewTrainInputs> = (data) => console.log({data});

  const {data: voyages} = useQuery({
    queryKey: ['addTrain_voyageIDs'],
    queryFn: async () => {
      const response = await Axios.get<APIResponse<VoyageData>>('http://localhost:3000/voyage');
      return response.data.data?.rows;
    }
  });

  useEffect(() => {
    console.log(voyages);
  }, [voyages]);

  return <>
    <DialogFormContainer
      title="Add new train"
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
        const response = await Axios.post<APIResponse>('http://localhost:3000/train/new', entryData)
        return response.data;
      }}
      className="add-train-form-container"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem'}}>
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
        </div>
      </form>
    </DialogFormContainer>
  </>
}

export {AddTrainForm}