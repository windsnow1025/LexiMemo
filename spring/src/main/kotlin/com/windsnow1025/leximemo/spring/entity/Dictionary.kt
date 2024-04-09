package com.windsnow1025.leximemo.spring.entity


import jakarta.persistence.*
import jakarta.validation.constraints.NotNull


@Entity
@Table( name = "dictionary")
open class Dictionary(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dictionary_id")
    open var id: Int,

    @Column(name = "dictionary_name")
    @NotNull
    open var dictionaryName:String
)
