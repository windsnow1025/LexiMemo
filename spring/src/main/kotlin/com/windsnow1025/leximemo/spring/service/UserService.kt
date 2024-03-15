package com.windsnow1025.leximemo.spring.service

import com.windsnow1025.leximemo.spring.logic.createTokenFromUsername
import com.windsnow1025.leximemo.spring.model.User
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
class UserService(val db: JdbcTemplate) {
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