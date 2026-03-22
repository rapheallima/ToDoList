package com.raphael.todolist.model;

import com.raphael.todolist.enums.TarefasPrioridadeEnum;
import com.raphael.todolist.enums.TarefasStatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
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
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private java.time.LocalDate dataCriacao;

    @PrePersist
    protected void aoCriarTarefa() {
        this.dataCriacao = LocalDate.now();
    }

}
