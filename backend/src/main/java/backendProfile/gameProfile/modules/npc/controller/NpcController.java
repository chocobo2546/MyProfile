package backendProfile.gameProfile.modules.npc.controller;

import backendProfile.gameProfile.common.response.ApiResponse;
import backendProfile.gameProfile.modules.npc.dto.request.CreateNpcRequest;
import backendProfile.gameProfile.modules.npc.dto.request.UpdateNpcRequest;
import backendProfile.gameProfile.modules.npc.dto.response.DialogueResponse;
import backendProfile.gameProfile.modules.npc.dto.response.NpcResponse;
import backendProfile.gameProfile.modules.npc.service.NpcService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/npc")
@RequiredArgsConstructor
public class NpcController {

    private final NpcService npcService;

    @GetMapping
    public ApiResponse<List<NpcResponse>> getAllNpcs() {
        return ApiResponse.success("NPCs retrieved successfully", npcService.getAllNpcs());
    }

    @GetMapping("/{id}")
    public ApiResponse<NpcResponse> getNpcById(@PathVariable Long id) {
        return ApiResponse.success("NPC retrieved successfully", npcService.getNpcById(id));
    }

    @GetMapping("/{id}/dialogues")
    public ApiResponse<List<DialogueResponse>> getDialogues(@PathVariable Long id) {
        return ApiResponse.success("Dialogues retrieved successfully", npcService.getNpcDialogues(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<NpcResponse> createNpc(@Valid @RequestBody CreateNpcRequest request) {
        return ApiResponse.success("NPC created successfully", npcService.createNpc(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<NpcResponse> updateNpc(@PathVariable Long id, @Valid @RequestBody UpdateNpcRequest request) {
        return ApiResponse.success("NPC updated successfully", npcService.updateNpc(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deleteNpc(@PathVariable Long id) {
        npcService.deleteNpc(id);
        return ApiResponse.success("NPC deleted successfully", null);
    }
}
