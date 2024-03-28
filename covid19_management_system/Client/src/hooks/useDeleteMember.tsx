import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../api/members";
import { toast } from "react-toastify";

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMember,
    onSuccess(res) {
      queryClient.invalidateQueries({ queryKey: ["membersDetalis"] });
      toast.success(res.message);
    },
    onError() {
      toast.error("error in deleting the member");
    },
  });
};
