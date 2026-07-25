import api from "./axios";

export const createLead = async (data: any) => {
  const response = await api.post("/leads/public", data);
  return response.data;
};

export const getLeads = async (page = 1, limit = 10, filters?: any) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (filters?.status) params.append("status", filters.status);
  if (filters?.assignedTo) params.append("assignedTo", filters.assignedTo);
  if (filters?.sortBy) params.append("sortBy", filters.sortBy);
  if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);

  const response = await api.get(`/leads?${params.toString()}`);
  return response.data;
};

export const getLead = async (id: string) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};

export const getLeadById = async (id: string) => {
  const { data } = await api.get(`/leads/${id}`);
  return data;
};

export const updateLead = async (id: string, data: any) => {
  const response = await api.put(`/leads/${id}`, data);
  return response.data;
};

export const updateLeadStatus = async (id: string, status: string) => {
  const response = await api.patch(`/leads/${id}/status`, { status });
  return response.data;
};

export const assignLead = async (id: string, assignedTo: string) => {
  const response = await api.patch(`/leads/${id}/assign`, { assignedTo });
  return response.data;
};

export const deleteLead = async (id: string) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};

// Notes
export const addNote = async (leadId: string, content: string) => {
  const response = await api.post(`/notes/${leadId}`, { content });
  return response.data;
};

export const getNotes = async (leadId: string) => {
  const response = await api.get(`/notes/${leadId}`);
  return response.data;
};

// Activity
export const getActivities = async (leadId: string) => {
  const response = await api.get(`/activity/${leadId}`);
  return response.data;
};