package com.windsnow1025.leximemo.spring.service

import com.windsnow1025.leximemo.spring.entity.Word
import com.windsnow1025.leximemo.spring.logic.parseUsernameFromToken
import com.windsnow1025.leximemo.spring.repository.UserRepository
import com.windsnow1025.leximemo.spring.repository.WordRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import javax.naming.InsufficientResourcesException

@Service
class WordService(val db: WordRepository) {
    fun getWords(token: String): List<Word> {
        val username = parseUsernameFromToken(token);
        return db.findAll().toList()
    }
    fun getWord(token: String, word: String): Word?{
        val userName = parseUsernameFromToken(token);
        return db.findByWord(word)
    }

    @Autowired
    lateinit var userRepository: UserRepository
    fun addWord(token: String, word: Word): Word {
        val username = parseUsernameFromToken(token)
        if (userRepository.findByUsername(username)?.userType  == "admin"){
            return db.save(word);
        } else {
            throw InsufficientResourcesException("Insufficient permission to add word")
        }
    }
}