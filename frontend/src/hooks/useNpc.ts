import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { npcService, type NPC } from "../services/npcService";

export const useNPCs = () => {
  return useQuery({
    queryKey: ["npcs"],
    queryFn: () => npcService.getAllNPCs().then(res => res.data),
  });
};

export const useNPC = (id: number) => {
  return useQuery({
    queryKey: ["npcs", id],
    queryFn: () => npcService.getNPCById(id).then(res => res.data),
    enabled: !!id,
  });
};

export const useNPCDialogues = (npcId: number) => {
  return useQuery({
    queryKey: ["npcs", npcId, "dialogues"],
    queryFn: () => npcService.getDialogues(npcId).then(res => res.data),
    enabled: !!npcId,
  });
};

// Admin mutations
export const useCreateNPC = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<NPC, "id">) => npcService.createNPC(data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["npcs"] }),
  });
};

export const useUpdateNPC = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<NPC> }) => npcService.updateNPC(id, data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["npcs"] }),
  });
};

export const useDeleteNPC = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => npcService.deleteNPC(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["npcs"] }),
  });
};