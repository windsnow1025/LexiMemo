package com.windsnow1025.leximemo.spring.controller

import com.windsnow1025.leximemo.spring.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController(val service: UserService) {
    @GetMapping("/user")
    fun signIn(@RequestParam username: String, @RequestParam password: String): ResponseEntity<Void> {
        return if (service.signIn(username, password))
            ResponseEntity.ok().build()
        else
            ResponseEntity.badRequest().build()
    }

    @PostMapping("/user")
    fun signUp(@RequestParam username: String, @RequestParam password: String): ResponseEntity<Void> {
        return if (service.signUp(username, password))
            ResponseEntity.ok().build()
        else
            ResponseEntity.badRequest().build()
    }
}