package com.windsnow1025.leximemo.spring.repository

import com.windsnow1025.leximemo.spring.model.User
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, Int> {
    fun findByUsername(username: String): User?
}