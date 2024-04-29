package com.windsnow1025.leximemo.spring.entity

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.*

@Entity
class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,

    @Column(unique = true)
    var username: String?,

    var password: String,

    var type: String = "normal",

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    var userWords: MutableSet<UserWord> = mutableSetOf()
)