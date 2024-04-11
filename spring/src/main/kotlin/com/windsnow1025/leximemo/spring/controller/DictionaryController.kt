package com.windsnow1025.leximemo.spring.controller

import com.windsnow1025.leximemo.spring.entity.Dictionary
import com.windsnow1025.leximemo.spring.service.DictionaryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader

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

}