package backendProfile.gameProfile.modules.npc.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "npc_dialogues")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NpcDialogue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "npc_id", nullable = false)
    private Npc npc;

    @Column(name = "sequence_order", nullable = false)
    private Integer sequenceOrder;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;
}