package com.windsnow1025.leximemo.spring.entity

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.*

@Entity
class Word(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int?,
    var word: String,

    var translation: String,

    var exampleSentence: String,

    var frequency: Int,

    @OneToMany(mappedBy = "word")
    @JsonBackReference
    var userWords: MutableSet<UserWord> = mutableSetOf(),

    @ManyToMany(mappedBy = "words")
    var dictionaries: MutableSet<Dictionary> = mutableSetOf()
)