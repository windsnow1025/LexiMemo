package com.windsnow1025.leximemo.spring.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table("USERS")
data class User(@Id var id: Int?, val username: String, val password: String)