package com.windsnow1025.leximemo.spring.service

import com.windsnow1025.leximemo.spring.logic.createTokenFromUsername
import com.windsnow1025.leximemo.spring.logic.parseUsernameFromToken
import com.windsnow1025.leximemo.spring.entity.User
import com.windsnow1025.leximemo.spring.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(val userRepository: UserRepository) {
    fun getUserByToken(token: String): User? {
        val username = parseUsernameFromToken(token)
        return userRepository.findByUsername(username)
    }

    fun signIn(user: User): String? {
        val existingUser = userRepository.findByUsername(user.username!!)
        if (existingUser != null && existingUser.password == user.password) {
            return createTokenFromUsername(existingUser.username!!)
        }
        return null
    }

    fun signUp(user: User): User {
        return userRepository.save(user)
    }


    fun updatePasswordByToken(token: String, newPassword: String): Boolean {
        val username = parseUsernameFromToken(token)
        val user = userRepository.findByUsername(username) ?: return false
        user.password = newPassword
        userRepository.save(user)
        return true
    }
}