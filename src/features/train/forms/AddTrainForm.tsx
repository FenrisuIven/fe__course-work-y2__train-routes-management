import {DialogFormContainer} from "../../form/DialogFormContainer.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {NewTrainInputs} from "../schemas/NewTrainInputs.ts";
import {TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import {useEffect} from "react";
import {FormSelect} from "../../../shared/components/FormSelect.tsx";
import InputMask from "@mona-health/react-input-mask";


const AddTrainForm = () => {
  const {register, handleSubmit, getFieldState} = useForm<NewTrainInputs>();
  const onSubmit: SubmitHandler<NewTrainInputs> = (data) => console.log(data)

  const {data: voyages} = useQuery({
    queryKey: ['addTrain_voyageIDs'],
    queryFn: async () => {
      const response = await Axios.get('http://localhost:3000/train');
      console.log(response.data.data)
      return response.data.data;
    }
  });

  useEffect(() => {
    console.log(voyages);
  }, [voyages]);

  return <>
    <DialogFormContainer title="Add new train" buttons={{
      confirm: {
        label: 'Add',
        type: 'submit',
        handler: (): { inputValid: boolean, info: NewTrainInputs } => {
          console.log(getFieldState());
          return {inputValid: false, info: getFieldState()};
        }
      },
    }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem'}}>
          <TextField label={"Train Name"} {...register("name", {
            minLength: 4,
          })} />
          <InputMask mask="****-****-****-****" {...register("trackerSerial")}>
            <TextField label="Serial of new tracker" />
          </InputMask>
          <FormSelect
            options={voyages?.rows}
            label="Voyage"
            id="voyage-id"
            optionsKeyBase="addTrain_voyageId"
            registerProps={register("voyageID")}
          />
        </div>
      </form>
    </DialogFormContainer>
  </>
}

export {AddTrainForm}