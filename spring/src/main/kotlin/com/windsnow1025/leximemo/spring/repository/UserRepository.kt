package com.windsnow1025.leximemo.spring.repository

import com.windsnow1025.leximemo.spring.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Int> {
    fun findByUsername(username: String): User?
}