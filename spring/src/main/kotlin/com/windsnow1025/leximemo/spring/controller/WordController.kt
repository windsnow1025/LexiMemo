package com.windsnow1025.leximemo.spring.controller

import com.windsnow1025.leximemo.spring.entity.Word
import com.windsnow1025.leximemo.spring.service.WordService
import io.jsonwebtoken.MalformedJwtException
import io.jsonwebtoken.security.SignatureException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class WordController(val service: WordService) {
    @GetMapping("/words")
    fun getWords(@RequestHeader("Authorization") token: String): ResponseEntity<List<Word>> {
        try {
            val words = service.getWords(token)
            return ResponseEntity.ok(words)
        } catch (e: SignatureException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: MalformedJwtException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @GetMapping("/word")
    fun getWord(
        @RequestHeader("Authorization") token: String,
        @RequestParam word: String
    ): ResponseEntity<Word> {
        try {
            val specificWords = service.getWord(token, word)
            return ResponseEntity.ok(specificWords)
        } catch (e: SignatureException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: MalformedJwtException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @GetMapping("/word/{id}")
    fun getWord(
            @RequestHeader("Authorization") token: String,
            @PathVariable("id") id: Int
    ): ResponseEntity<Word> {
        try {
            val word: Word? = service.getWordById(token, id).orElse(null)
            return ResponseEntity.ok(word)
        } catch (e: SignatureException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: MalformedJwtException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @PostMapping("/word")
    fun addWord(@RequestHeader("Authorization") token: String, @RequestBody word: Word): ResponseEntity<Any> {
        try {
            return if (service.addWord(token, word) != null) {
                ResponseEntity.ok().build()
            } else {
                ResponseEntity.status(HttpStatus.FORBIDDEN).build()
            }
        } catch (e: SignatureException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: MalformedJwtException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }
}