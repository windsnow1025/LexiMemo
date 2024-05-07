package com.windsnow1025.leximemo.spring.service

import com.windsnow1025.leximemo.spring.entity.UserWord
import com.windsnow1025.leximemo.spring.logic.parseUsernameFromToken
import com.windsnow1025.leximemo.spring.repository.UserRepository
import com.windsnow1025.leximemo.spring.repository.UserWordRepository
import org.springframework.dao.DataAccessException
import org.springframework.stereotype.Service

@Service
class UserWordService(
    private val userWordRepository: UserWordRepository,
    private val userRepository: UserRepository
) {
    fun deleteUserWordByWordId(token: String, wordId: Int): Boolean {
        val username = parseUsernameFromToken(token);
        val userId = userRepository.findByUsername(username)?.id ?: return false
        val userWord = userWordRepository.findByUserIdAndWordId(userId, wordId)
        try {
            userWordRepository.delete(userWord)
        } catch (e: DataAccessException) {
            throw e
        }
        return true
    }

    fun updateUserWord(token: String, userWord: UserWord ): Boolean {
        val username = parseUsernameFromToken(token)
        val userId = userRepository.findByUsername(username)?.id ?: return false
        userWord.userId = userId
        userWordRepository.save(userWord)
        return true
    }
}