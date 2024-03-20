package com.windsnow1025.leximemo.spring.controller

import com.windsnow1025.leximemo.spring.entity.User
import com.windsnow1025.leximemo.spring.service.UserService
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class UserController(val service: UserService) {
    @GetMapping("/user")
    fun getUser(@RequestHeader("Authorization") token: String): ResponseEntity<User> {
        try {
            val user = service.getUser(token)
            return ResponseEntity.ok(user)
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @PostMapping("/user/sign-in")
    fun signIn(@RequestBody user: User): ResponseEntity<Map<String, String>> {
        try {
            val token = service.signIn(user)
            return if (token != null)
                ResponseEntity.ok(mapOf("token" to token))
            else
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @PostMapping("/user/sign-up")
    fun signUp(@RequestBody user: User): ResponseEntity<Void> {
        try {
            service.signUp(user)
            return ResponseEntity.ok().build()
        } catch (e: DataIntegrityViolationException) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build()
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @PostMapping("/user/password")
    fun updatePassword(@RequestHeader("Authorization") token: String, @RequestBody user: User): ResponseEntity<Void> {
        try {
            service.updatePasswordByToken(token, user.password)
            return ResponseEntity.ok().build()
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }
}