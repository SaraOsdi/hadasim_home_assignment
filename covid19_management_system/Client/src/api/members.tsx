import axios from "axios";

export const retrieveMemberDetails = async () => {
  const response = await axios.get(`http://127.0.0.1:3302/api/members/`);
  return response.data;
};

export const AddMember = async (memberData: unknown) => {
  const response = await axios.post(
    `http://127.0.0.1:3302/api/members/`,
    memberData
  );
  return response.data;
};

export const UpdateMember = async (memberData: unknown) => {
  const response = await axios.patch(
    `http://127.0.0.1:3302/api/members/`,
    memberData
  );
  return response.data;
};

export const deleteMember = async (memberId: any) => {
  const response = await axios.delete(
    `http://127.0.0.1:3302/api/members/${memberId}`
  );
  return response.data;
};
