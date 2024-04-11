package com.windsnow1025.leximemo.spring.entity

import jakarta.persistence.*

@Entity
class Word(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int?,
    var word: String,

    var translation: String,

    var exampleSentence: String,

    var frequency: Int,

    @ManyToMany(mappedBy = "words")
    var users: MutableSet<User> = mutableSetOf(),

    @ManyToMany(mappedBy = "words")
    var dictionaries: MutableSet<Dictionary> = mutableSetOf()
)