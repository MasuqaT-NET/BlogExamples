// To avoid bug on Kotlin 1.1

package net.masuqat.example.kotlinwebfluxrouter

import org.springframework.test.web.reactive.server.WebTestClient

inline fun <reified T> WebTestClient.ResponseSpec.expectBody_() = expectBody(T::class.java)

fun <T> WebTestClient.BodySpec<T, *>.isEqualTo_(expected: T) = {
    isEqualTo<Nothing?>(expected)
}