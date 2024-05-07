package com.windsnow1025.leximemo.spring.controller

import com.windsnow1025.leximemo.spring.entity.User
import com.windsnow1025.leximemo.spring.entity.UserWord
import com.windsnow1025.leximemo.spring.service.UserService
import com.windsnow1025.leximemo.spring.service.UserWordService
import io.jsonwebtoken.MalformedJwtException
import io.jsonwebtoken.security.SignatureException
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class UserController(val service: UserService,
                     val userWordService: UserWordService
) {
    @GetMapping("/user")
    fun getUser(@RequestHeader("Authorization") token: String): ResponseEntity<User> {
        try {
            val user = service.getUserByToken(token)
            return ResponseEntity.ok(user)
        } catch (e: SignatureException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: MalformedJwtException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
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
        } catch (e: SignatureException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: MalformedJwtException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @GetMapping("/user/user-word")
    fun getWordsFromUser(@RequestHeader("Authorization") token: String): ResponseEntity<List<UserWord>> {
        try {
            val userWord = service.getUserWords(token)
            return ResponseEntity.ok(userWord)
        } catch (e: SignatureException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: MalformedJwtException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: DataIntegrityViolationException) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build()
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @PostMapping("/user/user-word")
    fun addWordsToUser(@RequestHeader("Authorization") token: String, @RequestBody userWord: UserWord): ResponseEntity<Void> {
        try {
            service.addWordToUser(token, userWord)
            return ResponseEntity.ok().build()
        } catch (e: SignatureException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: MalformedJwtException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        } catch (e: DataIntegrityViolationException) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build()
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @PutMapping("/user/user-word")
    fun updateUserWord(@RequestHeader("Authorization") token: String, @RequestBody userWord: UserWord): ResponseEntity<Void> {
        try {
            if (userWordService.updateUserWord(token, userWord)){
                return ResponseEntity.ok().build()
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
            }
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }

    @DeleteMapping("/user/{id}")
    fun deleteUserWord(@RequestHeader("Authorization") token: String, @PathVariable("id") id: Int): ResponseEntity<Void> {
        try {
            if (userWordService.deleteUserWordByWordId(token, id)){
                return ResponseEntity.ok().build()
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
            }
        } catch (e: Exception) {
            println(e)
            return ResponseEntity.internalServerError().build()
        }
    }
}