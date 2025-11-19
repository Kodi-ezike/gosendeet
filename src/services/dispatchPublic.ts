import { api } from "./axios";
import { TaskDto } from "./tasks";
import { throwApiError } from "@/lib/errorHandling";

export interface DispatchView {
  bookingId: string;
  orderNumber: string;
  trackingNumber: string;
  companyId: string;
  companyName: string;
  aggregatedStatus: string;
  totalTasks: number;
  completedTasks: number;
  tasks: TaskDto[];
}

export interface DispatchActionResponse {
  message: string;
}

export const viewDispatch = async (token: string): Promise<DispatchView> => {
  try {
    const res = await api.get<DispatchView | { data: DispatchView }>(
      `/dispatch/${token}`
    );
    return "data" in res.data ? res.data.data : res.data;
  } catch (error) {
    return throwApiError(error, "Unable to load dispatch");
  }
};

export const acceptDispatch = async (
  token: string,
  message?: string
): Promise<DispatchActionResponse> => {
  try {
    const res = await api.post<DispatchActionResponse>(
      `/dispatch/${token}/accept`,
      message ? { message } : {}
    );
    return res.data;
  } catch (error) {
    return throwApiError(error, "Unable to accept dispatch");
  }
};

export const declineDispatch = async (
  token: string,
  reason: string
): Promise<DispatchActionResponse> => {
  try {
    const res = await api.post<DispatchActionResponse>(
      `/dispatch/${token}/decline`,
      { reason }
    );
    return res.data;
  } catch (error) {
    return throwApiError(error, "Unable to decline dispatch");
  }
};

export const startTask = async (
  token: string,
  taskId: string,
  message?: string
): Promise<DispatchActionResponse> => {
  try {
    const res = await api.post<DispatchActionResponse>(
      `/dispatch/${token}/tasks/${taskId}/start`,
      message ? { message } : {}
    );
    return res.data;
  } catch (error) {
    return throwApiError(error, "Unable to start task");
  }
};

export const completeTask = async (
  token: string,
  taskId: string,
  payload: { message?: string; notes?: string; proofPhotos?: File[] }
): Promise<DispatchActionResponse> => {
  const form = new FormData();

  // Create request JSON object for message and notes
  const requestData: { message?: string; notes?: string } = {};
  if (payload.message?.trim()) {
    requestData.message = payload.message.trim();
  }
  if (payload.notes?.trim()) {
    requestData.notes = payload.notes.trim();
  }

  // Always add request field, even if empty (backend expects it)
  form.append(
    "request",
    new Blob([JSON.stringify(requestData)], {
      type: "application/json",
    })
  );

  // Add proof photos
  if (payload.proofPhotos && payload.proofPhotos.length > 0) {
    payload.proofPhotos.forEach((file) => {
      form.append("proofPhotos", file);
    });
  }

  try {
    const res = await api.post<DispatchActionResponse>(
      `/dispatch/${token}/tasks/${taskId}/complete`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    return throwApiError(error, "Unable to complete task");
  }
};

export const updateTaskEtaWindow = async (
  token: string,
  taskId: string,
  estimatedTimeWindowStart: string,
  estimatedTimeWindowEnd: string
): Promise<DispatchActionResponse> => {
  try {
    const res = await api.put<DispatchActionResponse>(
      `/dispatch/${token}/tasks/${taskId}/eta`,
      { estimatedTimeWindowStart, estimatedTimeWindowEnd }
    );
    return res.data;
  } catch (error) {
    return throwApiError(error, "Unable to update ETA window");
  }
};

export const terminateTask = async (
  token: string,
  taskId: string,
  reason: string
): Promise<DispatchActionResponse> => {
  try {
    const res = await api.post<DispatchActionResponse>(
      `/dispatch/${token}/tasks/${taskId}/terminate`,
      { reason }
    );
    return res.data;
  } catch (error) {
    return throwApiError(error, "Unable to terminate task");
  }
};
