package com.raphael.todolist.model;

import com.raphael.todolist.enums.TarefasPrioridadeEnum;
import com.raphael.todolist.enums.TarefasStatusEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tarefas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;

    @Enumerated(EnumType.STRING)
    private TarefasPrioridadeEnum prioridade;

    @Enumerated(EnumType.STRING)
    private TarefasStatusEnum status;

    @ManyToOne
    private Usuario usuario_id;

    private java.time.LocalDate dataCriacao;

    protected void aoCriarTarefa() {
        this.dataCriacao = java.time.LocalDate.now();
    }

}
