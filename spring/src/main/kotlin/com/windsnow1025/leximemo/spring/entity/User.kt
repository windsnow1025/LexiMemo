package com.windsnow1025.leximemo.spring.entity

import jakarta.persistence.*

@Entity
class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,
    var username: String?,

    var password: String,

    var type: String = "normal",

    @ManyToMany
    @JoinTable(
        name = "user_word",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "word_id")]
    )
    var words: MutableSet<Word> = mutableSetOf(),
)