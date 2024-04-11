package com.windsnow1025.leximemo.spring.service

import com.windsnow1025.leximemo.spring.entity.Word
import com.windsnow1025.leximemo.spring.logic.parseUsernameFromToken
import com.windsnow1025.leximemo.spring.repository.UserRepository
import com.windsnow1025.leximemo.spring.repository.WordRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class WordService(
    val wordRepository: WordRepository,
    val userRepository: UserRepository
) {
    fun getWords(token: String): List<Word> {
        parseUsernameFromToken(token)
        return wordRepository.findAll().toList()
    }

    fun getWord(token: String, word: String): Word? {
        parseUsernameFromToken(token)
        return wordRepository.findByWord(word)
    }

    fun getWordById(token: String, id: Int): Optional<Word> {
        parseUsernameFromToken(token)
        return wordRepository.findById(id)
    }

    fun addWord(token: String, word: Word): Word? {
        val username = parseUsernameFromToken(token)
        if (userRepository.findByUsername(username)?.type != "admin") {
            return null
        }
        return wordRepository.save(word)
    }
}