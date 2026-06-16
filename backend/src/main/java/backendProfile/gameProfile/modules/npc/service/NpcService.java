package backendProfile.gameProfile.modules.npc.service;

import backendProfile.gameProfile.common.exception.ResourceNotFoundException;
import backendProfile.gameProfile.modules.npc.dto.request.CreateNpcRequest;
import backendProfile.gameProfile.modules.npc.dto.request.UpdateNpcRequest;
import backendProfile.gameProfile.modules.npc.dto.response.DialogueResponse;
import backendProfile.gameProfile.modules.npc.dto.response.NpcResponse;
import backendProfile.gameProfile.modules.npc.entity.Npc;
import backendProfile.gameProfile.modules.npc.entity.World;
import backendProfile.gameProfile.modules.npc.mapper.DialogueMapper;
import backendProfile.gameProfile.modules.npc.mapper.NpcMapper;
import backendProfile.gameProfile.modules.npc.repository.NpcDialogueRepository;
import backendProfile.gameProfile.modules.npc.repository.NpcRepository;
import backendProfile.gameProfile.modules.npc.repository.WorldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NpcService {

    private final NpcRepository npcRepository;
    private final WorldRepository worldRepository;
    private final NpcDialogueRepository npcDialogueRepository;
    private final NpcMapper npcMapper;
    private final DialogueMapper dialogueMapper;

    @Transactional(readOnly = true)
    public List<NpcResponse> getAllNpcs() {
        return npcRepository.findAll().stream()
                .map(npcMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public NpcResponse getNpcById(Long id) {
        Npc npc = npcRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NPC not found"));
        return npcMapper.toResponse(npc);
    }

    @Transactional(readOnly = true)
    public List<DialogueResponse> getNpcDialogues(Long npcId) {
        if (!npcRepository.existsById(npcId)) {
            throw new ResourceNotFoundException("NPC not found");
        }
        return npcDialogueRepository.findByNpcIdOrderBySequenceOrderAsc(npcId).stream()
                .map(dialogueMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public NpcResponse createNpc(CreateNpcRequest request) {
        World world = worldRepository.findById(request.getWorldId())
                .orElseThrow(() -> new ResourceNotFoundException("World not found"));

        Npc npc = Npc.builder()
                .name(request.getName())
                .world(world)
                .build();

        Npc savedNpc = npcRepository.save(npc);
        return npcMapper.toResponse(savedNpc);
    }

    @Transactional
    public NpcResponse updateNpc(Long id, UpdateNpcRequest request) {
        Npc npc = npcRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NPC not found"));

        World world = worldRepository.findById(request.getWorldId())
                .orElseThrow(() -> new ResourceNotFoundException("World not found"));

        npc.setName(request.getName());
        npc.setWorld(world);

        Npc updatedNpc = npcRepository.save(npc);
        return npcMapper.toResponse(updatedNpc);
    }

    @Transactional
    public void deleteNpc(Long id) {
        if (!npcRepository.existsById(id)) {
            throw new ResourceNotFoundException("NPC not found");
        }
        npcRepository.deleteById(id);
    }
}
