package com.windsnow1025.leximemo.spring.controller

import com.windsnow1025.leximemo.spring.model.User
import com.windsnow1025.leximemo.spring.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class UserController(val service: UserService) {
    @GetMapping("/user")
    fun getUser(@RequestHeader("Authorization") token: String): ResponseEntity<User> {
        val user: User = service.getUser(token)
        return ResponseEntity.ok(user)
    }

    @PostMapping("/user/sign-in")
    fun signIn(@RequestBody user: User): ResponseEntity<Map<String, String>> {
        val token: String? = service.signIn(user)
        return if (token != null)
            ResponseEntity.ok(mapOf("token" to token))
        else
            ResponseEntity.badRequest().build()
    }

    @PostMapping("/user/sign-up")
    fun signUp(@RequestBody user: User): ResponseEntity<Void> {
        return if (service.signUp(user))
            ResponseEntity.ok().build()
        else
            ResponseEntity.badRequest().build()
    }
}