package net.masuqat.example.kotlinwebfluxrouter.handler

import org.reactivestreams.Publisher
import org.springframework.web.reactive.function.server.ServerResponse

inline fun <reified T : kotlin.Any, PT : Publisher<T>> ServerResponse.BodyBuilder.body_(arg: PT) = body(arg, T::class.java)