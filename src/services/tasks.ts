import { api } from "./axios";

export type TaskType = "PICKUP" | "DROPOFF" | "IN_HUB";
export type TaskStatus =
  | "DRAFT"
  | "DISPATCHED"
  | "ACCEPTED"
  | "DECLINED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "TERMINATED";
export type TaskCompletionRequirement = "PHOTO" | "NONE";

export interface TaskDto {
  id: string;
  bookingId: string;
  companyId?: string | null;
  companyName?: string | null;
  taskType: TaskType;
  status: TaskStatus;
  destinationAddress: string;
  completionRequirement?: TaskCompletionRequirement | null;
  completeBefore?: string;
  completeAfter?: string;
  estimatedTime?: string;
  estimatedTimeWindowStart?: string;
  estimatedTimeWindowEnd?: string;
  notes?: string;
  dependsOn?: string[];
  dispatchedAt?: string;
  respondedAt?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  completionProofs?: Array<{
    id?: string;
    url?: string;
    fileUrl?: string;
    fileName?: string;
  }>;
  proofPhotos?: string[];
  previewToken?: string;
  terminationReason?: string;
  declineReason?: string;
}

export interface TaskInput {
  taskType: TaskType;
  destinationAddress: string;
  completionRequirement?: TaskCompletionRequirement;
  completeBefore?: string;
  completeAfter?: string;
  estimatedTime?: string;
  estimatedTimeWindowStart?: string;
  estimatedTimeWindowEnd?: string;
  notes?: string;
  dependsOn?: number[];
}

export interface CreateTasksPayload {
  bookingId: string;
  tasks: TaskInput[];
}

export interface UpdateTaskPayload {
  taskType?: TaskType;
  destinationAddress?: string;
  completionRequirement?: TaskCompletionRequirement;
  completeBefore?: string;
  completeAfter?: string;
  estimatedTime?: string;
  estimatedTimeWindowStart?: string;
  estimatedTimeWindowEnd?: string;
  notes?: string;
  dependsOn?: Array<number | string>;
}

export interface AssignTasksPayload {
  taskIds: string[];
  companyId?: string | null;
}

export interface DispatchPreviewCompanyDetail {
  companyId: string;
  companyName: string;
  email: string;
  taskCount: number;
  previewToken: string;
  tasks: TaskDto[];
}

export interface DispatchPreviewData {
  bookingId: string;
  orderNumber: string;
  companiesAffected: number;
  draftTasksReady: number;
  tasksPerCompany: Record<string, number>;
  companyDetails: Record<string, DispatchPreviewCompanyDetail>;
  validationErrors: string[];
  warnings: string[];
}

export interface DispatchSummary {
  bookingId: string;
  orderNumber: string;
  dispatchedAt: string;
  totalTasksDispatched: number;
  companiesNotified: number;
  dispatchTokens: Record<string, string>;
}

export interface DispatchResponse {
  message: string;
  summary: DispatchSummary;
}

type ApiEnvelope<T> = {
  data: T;
  message?: string;
  [key: string]: unknown;
};

type BasicResponse = {
  message?: string;
  [key: string]: unknown;
};

const unwrapError = (error: unknown): never => {
  if (typeof error === "object" && error !== null) {
    const withResponse = error as { response?: { data?: unknown } };
    if (withResponse.response?.data) {
      throw withResponse.response.data;
    }

    const withMessage = error as { message?: unknown };
    if (typeof withMessage.message === "string" && withMessage.message.trim()) {
      throw { message: withMessage.message };
    }
  }

  if (typeof error === "string" && error.trim()) {
    throw { message: error };
  }

  throw { message: "Something went wrong" };
};

export const getTasksByBooking = async (
  bookingId: string
): Promise<ApiEnvelope<TaskDto[]>> => {
  try {
    const res = await api.get<ApiEnvelope<TaskDto[]>>(
      `/tasks/booking/${bookingId}`
    );
    return res.data;
  } catch (error: unknown) {
    unwrapError(error);
  }
};

export const getTasksByCompany = async (
  companyId: string
): Promise<ApiEnvelope<TaskDto[]>> => {
  try {
    const res = await api.get<ApiEnvelope<TaskDto[]>>(
      `/tasks/company/${companyId}`
    );
    return res.data;
  } catch (error: unknown) {
    unwrapError(error);
  }
};

export const createTasks = async (
  payload: CreateTasksPayload
): Promise<ApiEnvelope<TaskDto[]>> => {
  try {
    const res = await api.post<ApiEnvelope<TaskDto[]>>(`/tasks`, payload);
    return res.data;
  } catch (error: unknown) {
    unwrapError(error);
  }
};

export const assignTasks = async (
  payload: AssignTasksPayload
): Promise<BasicResponse> => {
  try {
    const res = await api.post<BasicResponse>(`/tasks/assign`, payload);
    return res.data;
  } catch (error: unknown) {
    unwrapError(error);
  }
};

export const updateTask = async (
  taskId: string,
  payload: UpdateTaskPayload
): Promise<ApiEnvelope<TaskDto>> => {
  try {
    const res = await api.put<ApiEnvelope<TaskDto>>(
      `/tasks/${taskId}`,
      payload
    );
    return res.data;
  } catch (error: unknown) {
    unwrapError(error);
  }
};

export const deleteTask = async (taskId: string): Promise<BasicResponse> => {
  try {
    const res = await api.delete<BasicResponse>(`/tasks/${taskId}`);
    return res.data;
  } catch (error: unknown) {
    unwrapError(error);
  }
};

export const previewDispatch = async (
  bookingId: string
): Promise<ApiEnvelope<DispatchPreviewData>> => {
  try {
    const res = await api.get<ApiEnvelope<DispatchPreviewData>>(
      `/bookings/${bookingId}/dispatch-preview`
    );
    return res.data;
  } catch (error: unknown) {
    unwrapError(error);
  }
};

export const dispatchBooking = async (
  bookingId: string
): Promise<DispatchResponse> => {
  try {
    const res = await api.post<DispatchResponse>(
      `/bookings/${bookingId}/dispatch`
    );
    return res.data;
  } catch (error: unknown) {
    unwrapError(error);
  }
};
