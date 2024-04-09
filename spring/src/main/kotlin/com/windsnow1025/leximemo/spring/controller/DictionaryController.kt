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
    @GetMapping("/dictionary")
    fun getDictionary(@RequestHeader("Authorization") token:String): ResponseEntity<List<Dictionary>> {
        try {
            val dictionarys = dictionaryService.getDictionaryList(token)
            return ResponseEntity(dictionarys, HttpStatus.OK)
        } catch (e: Exception) {
            println(e.message)
            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}