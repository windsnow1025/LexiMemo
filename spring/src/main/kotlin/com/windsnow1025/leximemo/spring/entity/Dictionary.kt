package com.windsnow1025.leximemo.spring.entity

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*

@Entity
class Dictionary(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,
    @Column(unique = true)
    var name: String,

    @ManyToMany
    @JoinTable(
        name = "dictionary_word",
        joinColumns = [JoinColumn(name = "dictionary_id")],
        inverseJoinColumns = [JoinColumn(name = "word_id")]
    )
    @JsonBackReference
    var words: MutableSet<Word> = mutableSetOf()
)
