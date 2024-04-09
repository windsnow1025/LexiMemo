package com.windsnow1025.leximemo.spring.entity

import jakarta.persistence.*

import org.springframework.data.relational.core.mapping.Table

@Entity
@Table(name = "user")
open class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open var id: Int?,

    @Column(name = "username", unique = true, nullable = false)
    open var username: String?,

    @Column(nullable = false)
    open var password: String,

    @Column(name = "user_type" ,nullable = false)
    open var type: String = "normal"


)