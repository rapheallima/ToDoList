package com.raphael.todolist.exception;

public record ErroResposta(int status, String mensagem, long timestamp) {
}
