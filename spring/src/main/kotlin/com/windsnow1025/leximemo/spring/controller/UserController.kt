package com.windsnow1025.leximemo.spring.controller

import com.windsnow1025.leximemo.spring.model.User
import com.windsnow1025.leximemo.spring.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class UserController(val service: UserService) {
    @GetMapping("/user")
    fun signIn(@RequestParam username: String, @RequestParam password: String): ResponseEntity<Map<String, String>> {
        val token: String? = service.signIn(User(null, username, password))
        return if (token != null)
            ResponseEntity.ok(mapOf("token" to token))
        else
            ResponseEntity.badRequest().build()
    }

    @PostMapping("/user")
    fun signUp(@RequestBody user: User): ResponseEntity<Void> {
        return if (service.signUp(user))
            ResponseEntity.ok().build()
        else
            ResponseEntity.badRequest().build()
    }
}