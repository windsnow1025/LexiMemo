package com.windsnow1025.leximemo.spring.service

import com.windsnow1025.leximemo.spring.entity.Dictionary
import com.windsnow1025.leximemo.spring.logic.parseUsernameFromToken
import com.windsnow1025.leximemo.spring.repository.DictionaryRepository
import com.windsnow1025.leximemo.spring.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DictionaryService(
    val dictionaryRepository: DictionaryRepository,
    val userRepository: UserRepository
) {
    fun getDictionaries(token: String): List<Dictionary> {
        parseUsernameFromToken(token)
        return dictionaryRepository.findAll()
    }

    fun addDictionary(token: String, dictionary: Dictionary): Dictionary? {
        val username = parseUsernameFromToken(token)
        if (userRepository.findByUsername(username)?.type != "admin") {
            return null
        }
        return dictionaryRepository.save(dictionary)
    }
}