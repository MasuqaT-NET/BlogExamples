package net.masuqat.example.kotlinwebfluxrouter.handler

import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.router
import reactor.core.publisher.toMono

@Component
class BarHandler : Handler {
    override fun route(): RouterFunction<ServerResponse> = router {
        ("/bar" and accept(MediaType.TEXT_PLAIN)).nest {
            GET("/") { index(it) }
//            GET("/", this@BarHandler::index)
            GET("/fuga") { fuga(it) }
//            GET("/fuga", this@BarHandler::fuga)
        }
    }

    // Using `BodyBuilderHelper.kt`
    fun index(req: ServerRequest) = ServerResponse.ok().body_("Hello! from Bar".toMono())

    // Using `BodyBuilderHelper.kt`
    fun fuga(req: ServerRequest) = ServerResponse.ok().body_("Fuga Page...".toMono())
}