package com.windsnow1025.leximemo.spring.service

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
        val userId = userRepository.findByUsername(username)?.id
        if (userId != null) {
            val userWord = userWordRepository.findByUserIdAndWordId(userId, wordId)
            if (userWord != null) {
                try {
                    userWordRepository.delete(userWord)
                    return true
                } catch (e : DataAccessException){
                    throw e
                }
            } else {
                return false
            }
        } else {
            return false
        }
    }
}