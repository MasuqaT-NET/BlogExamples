package net.masuqat.example.kotlinwebfluxrouter.handler

import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.ServerResponse

interface Handler {
    fun route(): RouterFunction<ServerResponse>
}