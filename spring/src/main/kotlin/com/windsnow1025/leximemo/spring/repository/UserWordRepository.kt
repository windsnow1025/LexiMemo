package com.windsnow1025.leximemo.spring.repository

import com.windsnow1025.leximemo.spring.entity.UserWord
import com.windsnow1025.leximemo.spring.entity.UserWordId
import org.springframework.data.jpa.repository.JpaRepository

interface UserWordRepository : JpaRepository<UserWord, UserWordId> {
    fun findByUserId(userId: Int): List<UserWord>
}