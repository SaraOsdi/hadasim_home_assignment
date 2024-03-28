import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateMember } from "../api/members";
import { toast } from "react-toastify";

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateMember,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["membersDetalis"] });
      toast.success("updated!");
    },
    onError(res) {
      toast.error(res.response.data.message);
    },
  });
};
