package com.windsnow1025.leximemo.spring.entity

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table("users")
data class User(@Id var id: Int?, val username: String?, val password: String, var userType: String = "normal")