package net.masuqat.example.kotlinwebfluxrouter

import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.ApplicationContext
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.reactive.server.WebTestClient

@RunWith(SpringRunner::class)
@SpringBootTest
class ApplicationTest {

    @Autowired
    private lateinit var context: ApplicationContext

    private lateinit var webClient: WebTestClient

    @Before
    fun setUp() {
        webClient = WebTestClient.bindToApplicationContext(context)
                .configureClient()
                .build()

    }

    @Test
    fun `foo index`() {
        webClient.get().uri("/foo/")
                .accept(MediaType.TEXT_PLAIN)
                .exchange()
                .expectStatus().isOk
                // Using `TestHelper.kt`
                .expectBody_<String>().isEqualTo_("Hello! from Foo")
    }

    @Test
    fun `foo hoge`() {
        webClient.get().uri("/foo/hoge")
                .accept(MediaType.TEXT_PLAIN)
                .exchange()
                .expectStatus().isOk
                // Using `TestHelper.kt`
                .expectBody_<String>().isEqualTo_("Hoge Page...")
    }

    @Test
    fun `bar index`() {
        webClient.get().uri("/bar/")
                .accept(MediaType.TEXT_PLAIN)
                .exchange()
                .expectStatus().isOk
                // Using `TestHelper.kt`
                .expectBody_<String>().isEqualTo_("Hello! from Bar")
    }

    @Test
    fun `bar fuga`() {
        webClient.get().uri("/bar/fuga")
                .accept(MediaType.TEXT_PLAIN)
                .exchange()
                .expectStatus().isOk
                // Using `TestHelper.kt`
                .expectBody_<String>().isEqualTo_("Fuga Page...")
    }
}