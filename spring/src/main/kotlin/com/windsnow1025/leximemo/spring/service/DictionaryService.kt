package com.windsnow1025.leximemo.spring.service

import com.windsnow1025.leximemo.spring.entity.Dictionary
import com.windsnow1025.leximemo.spring.entity.Word
import com.windsnow1025.leximemo.spring.logic.parseUsernameFromToken
import com.windsnow1025.leximemo.spring.repository.DictionaryRepository
import com.windsnow1025.leximemo.spring.repository.UserRepository
import com.windsnow1025.leximemo.spring.repository.WordRepository
import org.springframework.stereotype.Service

@Service
class DictionaryService(
    val dictionaryRepository: DictionaryRepository,
    val userRepository: UserRepository,
    private val wordRepository: WordRepository
) {
    fun getDictionaries(token: String): List<Dictionary> {
        parseUsernameFromToken(token)
        return dictionaryRepository.findAll()
    }

    fun getDictionaryWords(token: String, dictionaryId: Int): List<Word>? {
        parseUsernameFromToken(token)
        val dictionary = dictionaryRepository.findById(dictionaryId).orElse(null)
        return dictionary?.words?.toList()
    }

    fun addDictionary(token: String, dictionary: Dictionary): Dictionary? {
        val username = parseUsernameFromToken(token)
        if (userRepository.findByUsername(username)?.type != "admin") {
            return null
        }
        return dictionaryRepository.save(dictionary)
    }

    fun addWordToDictionary(token: String, wordId: Int, dictionaryId: Int): Dictionary? {
        val username = parseUsernameFromToken(token)
        if (userRepository.findByUsername(username)?.type != "admin") {
            return null
        }

        val word = wordRepository.findById(wordId).orElse(null)
        val dictionary = dictionaryRepository.findById(dictionaryId).orElse(null)

        dictionary.words.add(word)

        return dictionaryRepository.save(dictionary)
    }

    fun deleteWordFromDictionary(token: String, wordId: Int, dictionaryId: Int): Dictionary? {
        val username = parseUsernameFromToken(token)
        if (userRepository.findByUsername(username)?.type != "admin") {
            return null
        }

        val word = wordRepository.findById(wordId).orElse(null)
        val dictionary = dictionaryRepository.findById(dictionaryId).orElse(null)

        dictionary.words.remove(word)
        return dictionaryRepository.save(dictionary)
    }
}