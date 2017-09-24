package net.masuqat.example.kotlinwebfluxrouter

import net.masuqat.example.kotlinwebfluxrouter.handler.Handler
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.ServerResponse

@SpringBootApplication
class Application {
    @Bean
    fun routes(handlers: List<Handler>): RouterFunction<ServerResponse>
            = handlers.map(Handler::route).reduce(RouterFunction<ServerResponse>::and)
//            = handers.map { it.route() }.reduce { r1, r2 -> r1.and(r2) }
}

fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}