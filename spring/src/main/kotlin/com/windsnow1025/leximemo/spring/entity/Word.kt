package com.windsnow1025.leximemo.spring.entity


import jakarta.persistence.*
import org.springframework.data.relational.core.mapping.Table

@Entity
@Table(name = "word")
open class Word(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    open var id: Int?,

    @Column(name = "word", nullable = false)
    open var word: String,

    @Column(nullable = false)
    open var translation: String,


    open var exampleSentence: String?,

    @Column(nullable = false)
    open var frequency: Int?

)