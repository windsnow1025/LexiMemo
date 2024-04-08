package com.windsnow1025.leximemo.spring.entity

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table("user")
data class User(@Id var id: Int?, val username: String?, val password: String, var type: String = "normal")