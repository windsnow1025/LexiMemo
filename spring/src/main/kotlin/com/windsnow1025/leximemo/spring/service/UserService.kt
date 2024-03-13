package com.windsnow1025.leximemo.spring.service

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
class UserService(val db: JdbcTemplate) {
    fun signIn(username: String, password: String): Boolean {
        val result = db.queryForList("SELECT * FROM users WHERE username = ? AND password = ?", username, password)
        return result.isNotEmpty()
    }

    fun signUp(username: String, password: String): Boolean {
        val result = db.update("INSERT INTO users (username, password) VALUES (?, ?)", username, password)
        return result > 0
    }
}