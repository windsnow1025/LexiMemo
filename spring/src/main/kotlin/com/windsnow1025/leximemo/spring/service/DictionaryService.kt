package com.windsnow1025.leximemo.spring.service

import com.windsnow1025.leximemo.spring.entity.Dictionary
import com.windsnow1025.leximemo.spring.logic.parseUsernameFromToken
import com.windsnow1025.leximemo.spring.repository.DictionaryRepository
import org.springframework.stereotype.Service

@Service
class DictionaryService(val dictionaryRepository: DictionaryRepository) {
    fun getDictionaryList(token:String): List<Dictionary>{
        val username = parseUsernameFromToken(token)
        val dictionaryList = dictionaryRepository.findAll()
        return dictionaryList
    }

    fun addDictionary(token: String, dictionaryName: String): Boolean{
        val username = parseUsernameFromToken(token)
        val dictionary = Dictionary(0, dictionaryName)
        val savedDictionary = dictionaryRepository.save(dictionary)
        return savedDictionary != null
    }
}