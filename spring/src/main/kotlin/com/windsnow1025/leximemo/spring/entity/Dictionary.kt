package com.windsnow1025.leximemo.spring.entity

import jakarta.persistence.*

@Entity
class Dictionary(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,
    var name: String,

    @ManyToMany
    @JoinTable(
        name = "dictionary_word",
        joinColumns = [JoinColumn(name = "dictionary_id")],
        inverseJoinColumns = [JoinColumn(name = "word_id")]
    )
    var words: MutableSet<Word> = mutableSetOf()
)
