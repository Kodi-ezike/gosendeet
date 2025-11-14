import { getTasksByBooking, previewDispatch } from "@/services/tasks";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

type TasksResponse = Awaited<ReturnType<typeof getTasksByBooking>>;
type PreviewResponse = Awaited<ReturnType<typeof previewDispatch>>;
type TasksQueryKey = ["tasks", "booking", string];
type PreviewQueryKey = ["dispatch-preview", string];

export const useTasksByBooking = (
  bookingId: string,
  options?: Omit<
    UseQueryOptions<TasksResponse, unknown, TasksResponse, TasksQueryKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TasksResponse, unknown> => {
  return useQuery<TasksResponse, unknown, TasksResponse, TasksQueryKey>({
    queryKey: ["tasks", "booking", bookingId],
    queryFn: () => getTasksByBooking(bookingId),
    enabled: !!bookingId,
    ...options,
  });
};

export const useDispatchPreview = (
  bookingId: string,
  options?: Omit<
    UseQueryOptions<PreviewResponse, unknown, PreviewResponse, PreviewQueryKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<PreviewResponse, unknown> => {
  return useQuery<PreviewResponse, unknown, PreviewResponse, PreviewQueryKey>({
    queryKey: ["dispatch-preview", bookingId],
    queryFn: () => previewDispatch(bookingId),
    enabled: false, // Disabled by default, must be explicitly enabled
    ...options,
  });
};
