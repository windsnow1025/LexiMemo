package com.windsnow1025.leximemo.spring.service

import com.windsnow1025.leximemo.spring.logic.createTokenFromUsername
import com.windsnow1025.leximemo.spring.logic.parseUsernameFromToken
import com.windsnow1025.leximemo.spring.model.User
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.query
import org.springframework.stereotype.Service

@Service
class UserService(val db: JdbcTemplate) {
    fun getUser(token: String): User {
        val username = parseUsernameFromToken(token)
        return db.query("SELECT * FROM users WHERE username = ?", username) { response, _ ->
            User(response.getInt("id"), response.getString("username"), response.getString("password"))
        }[0]
    }

    fun signIn(user: User): String? {
        val result = db.queryForList(
            "SELECT * FROM users WHERE username = ? AND password = ?",
            user.username,
            user.password
        )
        if (result.isNotEmpty()) {
            return createTokenFromUsername(user.username)
        }
        return null
    }

    fun signUp(user: User): Boolean {
        val result = db.update(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            user.username,
            user.password
        )
        return result > 0
    }
}