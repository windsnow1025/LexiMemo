package com.windsnow1025.leximemo.spring.service

import com.windsnow1025.leximemo.spring.logic.createTokenFromUsername
import com.windsnow1025.leximemo.spring.logic.parseUsernameFromToken
import com.windsnow1025.leximemo.spring.entity.User
import com.windsnow1025.leximemo.spring.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(val db: UserRepository) {
    fun getUser(token: String): User? {
        val username = parseUsernameFromToken(token)
        return db.findByUsername(username)
    }

    fun signIn(user: User): String? {
        val existingUser = db.findByUsername(user.username!!)
        if (existingUser != null && existingUser.password == user.password) {
            return createTokenFromUsername(existingUser.username!!)
        }
        return null
    }

    fun signUp(user: User): User {
        return db.save(user)
    }


    fun updatePasswordByToken(token: String, password: String): Boolean {
        val username = parseUsernameFromToken(token)
        return db.updatePasswordByUsername(password, username)
    }
}