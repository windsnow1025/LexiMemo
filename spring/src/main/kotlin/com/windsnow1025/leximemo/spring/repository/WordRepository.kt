package com.windsnow1025.leximemo.spring.repository

import com.windsnow1025.leximemo.spring.entity.Word
import org.springframework.data.repository.CrudRepository

interface WordRepository : CrudRepository<Word, Int> {
    fun findByWord(word: String): Word?
}