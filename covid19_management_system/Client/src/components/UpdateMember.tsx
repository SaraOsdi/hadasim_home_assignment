import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateMember } from "../hooks/useUpdateMember";
import { useRef } from "react";
import { AddImage } from "../api/members";

type Inputs = {
  id_official: string;
  name: string;
  phone_number: string;
  cellphone: string;
  address_city: string;
  address_street: string;
  address_house_num: number;
  date_of_birth: string | null;
  id_serial: number;
  first_vaccination_date: string;
  second_vaccination_date: string;
  third_vaccination_date: string;
  forth_vaccination_date: string;
  vaccine_manufacturer: string;
  positive_test_date: string | null;
  recovery_date: string | null;
};

export function UpdateMember({ selectedMember }) {
  const { register, handleSubmit, } = useForm<Inputs>();
  const imageRef = useRef<HTMLInputElement | null>(null)

  const updateMemberMutation = useUpdateMember();

  const onSubmit: SubmitHandler<Inputs> = async (memberData) => {
    const updatedMember: Record<string, any> = {}
    for (const [key, value] of Object.entries(selectedMember)) {
      if (selectedMember[key]) {
        updatedMember[key] = value;
      }
    }

    for (const [key, value] of Object.entries(memberData)) {
      // @ts-ignore
      if (memberData[key]) {
        updatedMember[key] = value;
      }
    }

    await updateMemberMutation.mutateAsync(updatedMember);
    if (imageRef.current?.files?.length) {
      const imageFormData = new FormData();
      imageFormData.append('id', selectedMember.id_official)
      imageFormData.append('image', imageRef.current.files[0])
      await AddImage(imageFormData)
      window.location.reload()
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          columnGap: "vh",
          columnCount: "2",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <input
          placeholder="goverment ID"
          type="text"
          defaultValue={selectedMember.id_official}
          {...register("id_official", { required: true, disabled: !!selectedMember.id_official })}
          style={{ marginBottom: "2vh", marginTop: "2vh" }}
        />
        <input
          placeholder="FullName"
          type="text"
          defaultValue={selectedMember.name}
          {...register("name", { required: true })}
          style={{ marginBottom: "2vh" }}
        />
        <input
          placeholder="Main phone"
          type="text"
          defaultValue={selectedMember.phone_number}
          {...register("phone_number", { required: true })}
          style={{ marginBottom: "2vh" }}
        />
        <input
          placeholder="Cellphone"
          type="text"
          defaultValue={selectedMember.cellphone}
          {...register("cellphone", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="City"
          type="text"
          defaultValue={selectedMember.address_city}
          {...register("address_city", { required: true })}
          style={{ marginBottom: "4vh", marginTop: "2vh" }}
        />
        <input
          placeholder="Street"
          type="text"
          defaultValue={selectedMember.address_street}
          {...register("address_street", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="House number"
          type="number"
          defaultValue={selectedMember.address_house_num}
          {...register("address_house_num", { required: true })}
          style={{ marginBottom: "2vh" }}
        />
        <div>
          <label htmlFor="avatar">
            Avatar
          </label></div>
        <input
          id='avatar'
          type="file"
          accept="image/jpeg"
          ref={imageRef}
          style={{ marginBottom: "4vh" }}
        />
        <>
          <p>1st Vaccination date</p>
          <input
            placeholder="first vaccination date"
            type="date"
            defaultValue={selectedMember.first_vaccination_date?.slice(0, 10)}
            {...register("first_vaccination_date")}
            style={{ marginBottom: "2vh" }}
            disabled={!!selectedMember.first_vaccination_date}
            readOnly={!!selectedMember.first_vaccination_date}
          />
        </>
        <>
          <p>2nd Vaccination date</p>
          <input
            placeholder="second vaccination date"
            type="date"
            defaultValue={selectedMember.second_vaccination_date?.slice(0, 10)}
            {...register("second_vaccination_date")}
            style={{ marginBottom: "2vh" }}
          />
        </>
        <>
          <p>3rd Vaccination date</p>
          <input
            placeholder="third vaccination date"
            type="date"
            defaultValue={selectedMember.third_vaccination_date?.slice(0, 10)}
            {...register("third_vaccination_date")}
            style={{ marginBottom: "2vh" }}
          />
        </>
        <>
          <p>4th Vaccination date</p>
          <input
            placeholder="forth vaccination date"
            defaultValue={selectedMember.forth_vaccination_date?.slice(0, 10)}
            type="date"
            {...register("forth_vaccination_date")}
            style={{ marginBottom: "2vh" }}
          />
        </>
        <input
          placeholder="Vaccine manufacturer"
          type="text"
          defaultValue={selectedMember.vaccine_manufactorer}
          {...register("vaccine_manufacturer")}
          style={{ marginBottom: "2vh" }}
        />
        <p>Positive test date</p>
        <input
          placeholder="Positive test date"
          type="date"
          defaultValue={selectedMember.positive_test_date?.slice(0, 10)}
          {...register("positive_test_date", { disabled: !!selectedMember.positive_test_date })}
          style={{ marginBottom: "2vh" }}
        />
        {!selectedMember.recovery_date && (
          <>
            <p>Recovery date</p>
            <input
              placeholder="Recovery date"
              type="date"
              {...register("recovery_date")}
              style={{ marginBottom: "2vh" }}
            />
          </>
        )}
        <input
          type="submit"
          value="Update"
          style={{ marginTop: "2vh", width: "30vh", height: "7vh" }}
        />
      </div>
    </form>
  );
}
