import java.lang.Exception
import java.sql.Connection
import java.sql.DriverManager
import java.util.*

fun Connection.setTenantId(tenantId: String) {
    this.prepareStatement("SELECT set_config('app.tenant_id', ?, false)").use { statement ->
        statement.setString(1, tenantId)
        if (!statement.execute()) {
            throw Exception("Failed to set tenant.");
        }
    }
}

data class Employee(
    val id: String,
    val firstName: String,
    val lastName: String,
    val email: String?,
    val birthday: Date?
)

data class News(
    val id: Int,
    val announcedBy: String,
    val text: String
)

object Dao {
    private val dbUrl: String = System.getenv("DB_URL")

    private fun getConnection(): Connection =
        DriverManager.getConnection(dbUrl, "app_server", "hoge")

    fun getEmployees(tenantId: String): Iterable<Employee> = getConnection().use { connection ->
        connection.setTenantId(tenantId)
        connection.createStatement().use { statement ->
            statement.executeQuery("SELECT employee_id, first_name, last_name, email, birthday FROM app.employee")
                .let {
                    sequence {
                        while (it.next()) {
                            yield(
                                Employee(
                                    id = it.getString(1),
                                    firstName = it.getString(2),
                                    lastName = it.getString(3),
                                    email = it.getString(4),
                                    birthday = it.getDate(5)
                                )
                            )
                        }
                    }
                }.toList()
        }
    }

    // bug
    fun `^getEmployees`(tenantId: String): Iterable<Employee> = getConnection().use { connection ->
        connection.createStatement().use { statement ->
            statement.executeQuery("SELECT employee_id, first_name, last_name, email, birthday FROM app.employee")
                .let {
                    sequence {
                        while (it.next()) {
                            yield(
                                Employee(
                                    id = it.getString(1),
                                    firstName = it.getString(2),
                                    lastName = it.getString(3),
                                    email = it.getString(4),
                                    birthday = it.getDate(5)
                                )
                            )
                        }
                    }
                }.toList()
        }
    }

    fun getAllNews(): Iterable<News> = getConnection().use { connection ->
        connection.createStatement().use { statement ->
            statement.executeQuery("SELECT n.news_id, t.name AS announced_by, n.text FROM app.news AS n INNER JOIN app.tenant AS t ON t.tenant_id = n.announced_by")
                .let {
                    sequence {
                        while (it.next()) {
                            yield(
                                News(
                                    id = it.getInt(1),
                                    announcedBy = it.getString(2),
                                    text = it.getString(3)
                                )
                            )
                        }
                    }.toList()
                }
        }
    }
}

fun main() {
    val dao = Dao;

    for (employee in dao.getEmployees("foo")) {
        println(employee)
    }
    for (employee in dao.getEmployees("bar")) {
        println(employee)
    }

    for (news in dao.getAllNews()) {
        println(news)
    }


    for (employee in dao.`^getEmployees`("foo")) { // prevents leak
        println(employee)
    }
}
