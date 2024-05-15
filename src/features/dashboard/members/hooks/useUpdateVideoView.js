import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateVideoView as updateVideoViewApi } from "../../../../services/apiUsers";

export function useUpdateVideoView() {
  const queryClient = useQueryClient();

  const {
    mutate: updateVideoView,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateVideoViewApi,
    onSuccess: () => {
      toast.success("تم تعديل عدد مرات مشاهدة الفيديو المتاحة للمستخم بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["lectureContent"],
      });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { updateVideoView, isUpdating, error };
}
