import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddMember } from "../api/members";
import { toast } from "react-toastify";

export const useAddMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddMember,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["membersDetalis"] });
      toast.success("added!");
    },
    onError(res) {
      console.log(res);
      toast.error(res.response.data.message);
    },
  });
};
