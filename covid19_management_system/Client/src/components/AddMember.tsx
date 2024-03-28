import { useForm, SubmitHandler } from "react-hook-form";
import { useAddMember } from "../hooks/useAddMember";
import { toast } from "react-toastify";
import { MIN_DATE_OF_BIRTH, validateMember } from "./validations";
import { useRef } from "react";
import { AddImage } from "../api/members";

export type MemberFields = {
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

export function AddMember() {
  const { register, handleSubmit } = useForm<MemberFields>();
  const imageRef = useRef<HTMLInputElement | null>(null)

  const addMemberMutation = useAddMember();

  const onSubmit: SubmitHandler<MemberFields> = async (memberData) => {
    console.log(memberData);
    const error = validateMember(memberData)
    if (error) {
      return toast.error(error)
    }

    const result = await addMemberMutation.mutateAsync(memberData);
    console.log(result)

    if (imageRef.current?.files?.length) {
      const imageFormData = new FormData();
      imageFormData.append('id', memberData.id_official)
      imageFormData.append('image', imageRef.current.files[0])
      await AddImage(imageFormData)
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          columnGap: "5vh",
          columnCount: "3",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <input
          placeholder="goverment ID"
          type="text"
          {...register("id_official", { required: true })}
          style={{ marginBottom: "4vh", marginTop: "2vh" }}
        />
        <input
          placeholder="FullName"
          type="text"
          {...register("name", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="Main phone"
          type="text"
          {...register("phone_number", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="Cellphone"
          type="text"
          {...register("cellphone", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="City"
          type="text"
          {...register("address_city", { required: true })}
          style={{ marginBottom: "4vh", marginTop: "2vh" }}
        />
        <input
          placeholder="Street"
          type="text"
          {...register("address_street", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="House number"
          type="number"
          {...register("address_house_num", { required: true })}
          style={{ marginBottom: "4vh" }}
        />
        <div>
          <label htmlFor="dob">
            Date of birth
          </label></div>
        <input
          id='dob'
          placeholder="Date of birth"
          type="date"
          min={MIN_DATE_OF_BIRTH}
          {...register("date_of_birth", { required: true })}
          style={{ marginBottom: "4vh" }}
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
          min={MIN_DATE_OF_BIRTH}
          style={{ marginBottom: "4vh" }}
        />
        <p>1st Vaccination date</p>
        <input
          placeholder="first vaccination date"
          type="date"
          {...register("first_vaccination_date")}
          style={{ marginBottom: "4vh" }}
        />
        <p>2nd Vaccination date</p>
        <input
          placeholder="second vaccination date"
          type="date"
          {...register("second_vaccination_date")}
          style={{ marginBottom: "4vh" }}
        />
        <p>3rd Vaccination date</p>
        <input
          placeholder="third vaccination date"
          type="date"
          {...register("third_vaccination_date")}
          style={{ marginBottom: "6vh" }}
        />
        <p></p>
        <span>4th Vaccination date</span>
        <input
          placeholder="forth vaccination date"
          type="date"
          {...register("forth_vaccination_date")}
          style={{ marginBottom: "4vh" }}
        />
        <input
          placeholder="Vaccine manufacturer"
          type="text"
          {...register("vaccine_manufacturer")}
          style={{ marginBottom: "4vh" }}
        />
        <p>Positive test date</p>
        <input
          placeholder="Positive test date"
          type="date"
          {...register("positive_test_date")}
          style={{ marginBottom: "4vh" }}
        />
        <p>Recovery date</p>
        <input
          placeholder="Recovery date"
          type="date"
          {...register("recovery_date")}
          style={{ marginBottom: "4vh" }}
        />
        <input
          type="submit"
          value="Submit"
          style={{ marginTop: "2vh", width: "30vh", height: "10vh" }}
        />
      </div>
    </form>
  );
}
