package net.masuqat.example.kotlinwebfluxrouter.handler

import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.router
import reactor.core.publisher.toMono

@Component
class FooHandler : Handler {
    override fun route(): RouterFunction<ServerResponse> = router {
        ("/foo" and accept(MediaType.TEXT_PLAIN)).nest {
            GET("/") { index(it) }
//            GET("/", this@FooHandler::index)
            GET("/hoge") { hoge(it) }
//            GET("/hoge", this@FooHandler::hoge)
        }
    }

    // Using `BodyBuilderHelper.kt`
    fun index(req: ServerRequest) = ServerResponse.ok().body_("Hello! from Foo".toMono())

    // Using `BodyBuilderHelper.kt`
    fun hoge(req: ServerRequest) = ServerResponse.ok().body_("Hoge Page...".toMono())
}