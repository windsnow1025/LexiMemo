package com.windsnow1025.leximemo.spring.entity

import jakarta.persistence.*

@Embeddable
open class WordDictionaryKey(
    @Column(name = "dictionary_id", nullable = false)
    val dictionaryId: Int,


    @Column(name = "word_id", nullable = false)
    val wordId: Int
)

@Entity
@Table(name = "word_dictionary")
open class WordDictionary(
    @EmbeddedId
    open var id:WordDictionaryKey
)
