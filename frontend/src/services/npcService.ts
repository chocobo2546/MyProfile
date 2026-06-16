import { apiClient } from "../api/client";

export interface NPC {
  id: number;
  name: string;
  worldId: number;
}

export interface Dialogue {
  sequence: number;
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const npcService = {
  getAllNPCs: async (): Promise<ApiResponse<NPC[]>> => {
    const response = await apiClient.get<ApiResponse<NPC[]>>("/npc");
    return response.data;
  },

  getNPCById: async (id: number): Promise<ApiResponse<NPC | null>> => {
    const response = await apiClient.get<ApiResponse<NPC>>(`/npc/${id}`);
    return response.data;
  },

  getDialogues: async (npcId: number): Promise<ApiResponse<Dialogue[]>> => {
    const response = await apiClient.get<ApiResponse<Dialogue[]>>(`/npc/${npcId}/dialogues`);
    return response.data;
  },

  createNPC: async (data: Omit<NPC, "id">): Promise<ApiResponse<NPC>> => {
    const response = await apiClient.post<ApiResponse<NPC>>("/npc", data);
    return response.data;
  },

  updateNPC: async (id: number, data: Partial<NPC>): Promise<ApiResponse<NPC>> => {
    const response = await apiClient.put<ApiResponse<NPC>>(`/npc/${id}`, data);
    return response.data;
  },

  deleteNPC: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/npc/${id}`);
    return response.data;
  },
};
