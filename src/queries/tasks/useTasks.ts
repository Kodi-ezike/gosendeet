import { getTasksByBooking, previewDispatch } from "@/services/tasks";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type TasksResponse = Awaited<ReturnType<typeof getTasksByBooking>>;
type PreviewResponse = Awaited<ReturnType<typeof previewDispatch>>;
type TasksQueryKey = ["tasks", "booking", string];
type PreviewQueryKey = ["dispatch-preview", string];

export const useTasksByBooking = (
  bookingId: string,
  options?: UseQueryOptions<
    TasksResponse,
    unknown,
    TasksResponse,
    TasksQueryKey
  >
) => {
  const query = useQuery<TasksResponse, unknown, TasksResponse, TasksQueryKey>({
    queryKey: ["tasks", "booking", bookingId] as TasksQueryKey,
    queryFn: () => getTasksByBooking(bookingId),
    ...options,
    enabled:
      typeof options?.enabled === "boolean"
        ? options.enabled && !!bookingId
        : !!bookingId,
  });

  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
    refetch: query.refetch,
  };
};

export const useDispatchPreview = (
  bookingId: string,
  options?: UseQueryOptions<
    PreviewResponse,
    unknown,
    PreviewResponse,
    PreviewQueryKey
  >
) => {
  const query = useQuery<
    PreviewResponse,
    unknown,
    PreviewResponse,
    PreviewQueryKey
  >({
    queryKey: ["dispatch-preview", bookingId] as PreviewQueryKey,
    queryFn: () => previewDispatch(bookingId),
    ...options,
    enabled:
      typeof options?.enabled === "boolean"
        ? options.enabled && !!bookingId
        : false,
  });

  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
    refetch: query.refetch,
  };
};
