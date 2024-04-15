package com.windsnow1025.leximemo.spring.controller

import com.windsnow1025.leximemo.spring.entity.Dictionary
import com.windsnow1025.leximemo.spring.entity.Word
import com.windsnow1025.leximemo.spring.service.DictionaryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
class DictionaryController(val dictionaryService: DictionaryService) {
    @GetMapping("/dictionaries")
    fun getDictionary(@RequestHeader("Authorization") token: String): ResponseEntity<List<Dictionary>> {
        try {
            val dictionaries = dictionaryService.getDictionaries(token)
            return ResponseEntity.ok(dictionaries)
        } catch (e: Exception) {
            println(e)
            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @GetMapping("/dictionary/{id}")
    fun getDictionaryWord(
        @RequestHeader("Authorization") token: String,
        @PathVariable("id") id: Int,
    ): ResponseEntity<List<Word>> {
        try {
            val words = dictionaryService.getDictionaryWords(token, id)
            return ResponseEntity.ok(words)
        } catch (e: Exception) {
            println(e)
            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @PostMapping("/dictionary")
    fun addDictionary(@RequestHeader("Authorization") token: String, @RequestBody dictionary: Dictionary): ResponseEntity<Dictionary> {
        try {
            val dictionary = dictionaryService.addDictionary(token, dictionary)
            return ResponseEntity.ok(dictionary)
        } catch (e: Exception) {
            println(e)
            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @PostMapping("/dictionary/add")
    fun addDictionaryWord(
        @RequestHeader("Authorization") token: String,
        @RequestBody request: Map<String, String>
    ): ResponseEntity<Any>{
        val wordName = request["wordName"]
        val dictionaryName = request["dictionaryName"]
        try {
            if (wordName != null && dictionaryName != null) {
                dictionaryService.addWordToDictionary(token, wordName, dictionaryName)
                return ResponseEntity.ok().build()
            } else{
                return ResponseEntity(HttpStatus.BAD_REQUEST)
            }
        } catch (e: Exception) {
            println(e)
            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}