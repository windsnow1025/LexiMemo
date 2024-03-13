package com.windsnow1025.leximemo.spring

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class RootController {

   @GetMapping("/")
    fun index(): String {
         return "Hello, World!"
    }

}