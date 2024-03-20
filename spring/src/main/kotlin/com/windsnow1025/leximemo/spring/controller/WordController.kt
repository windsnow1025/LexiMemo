package com.windsnow1025.leximemo.spring.controller

import com.windsnow1025.leximemo.spring.entity.Word
import com.windsnow1025.leximemo.spring.service.WordService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.naming.InsufficientResourcesException

@RestController
class WordController(val service: WordService) {
    @GetMapping("/words")
    fun getWords(@RequestHeader("Authorization") token: String): ResponseEntity<List<Word>> {
        try {
            val words = service.getWords(token)
            return ResponseEntity.ok(words)
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @GetMapping("/word")
    fun getWord(@RequestHeader("Authorization") token: String,@RequestBody wordMap: Map<String, String>): ResponseEntity<Word> {
        try {
            val specificWords = service.getWord(token,wordMap["word"] ?: error("Word not found"))
            return ResponseEntity.ok(specificWords)
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @PostMapping("/word/add")
    fun addWord(@RequestHeader("Authorization") token: String, @RequestBody word: Word): ResponseEntity<Any> {
        try {
            val result = service.addWord(token, word)
            return ResponseEntity.ok().build()
        } catch (e: InsufficientResourcesException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Insufficient permission to add word")
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }
}