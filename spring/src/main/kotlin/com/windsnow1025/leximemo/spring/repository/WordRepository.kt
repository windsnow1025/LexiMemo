package com.windsnow1025.leximemo.spring.repository

import com.windsnow1025.leximemo.spring.entity.Word
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface WordRepository : JpaRepository<Word, Int> {
    fun findByWord(word: String): Word?
}