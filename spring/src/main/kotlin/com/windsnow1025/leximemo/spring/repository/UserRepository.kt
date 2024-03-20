package com.windsnow1025.leximemo.spring.repository

import com.windsnow1025.leximemo.spring.entity.User
import org.springframework.data.jdbc.repository.query.Modifying
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional


interface UserRepository : CrudRepository<User, Int> {
    fun findByUsername(username: String): User?

    @Modifying
    @Transactional
    @Query("UPDATE users SET password = :password WHERE username = :username")
    fun updatePasswordByUsername(@Param("password") password: String?, @Param("username") username: String?): Boolean


}

