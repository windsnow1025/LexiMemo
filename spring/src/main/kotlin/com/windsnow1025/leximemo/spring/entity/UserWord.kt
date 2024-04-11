package com.windsnow1025.leximemo.spring.entity

import jakarta.persistence.*
import java.util.Date

@Entity
@IdClass(UserWordId::class)
class UserWord(
    @Id
    @Column(name = "user_id")
    var userId: Int?,

    @Id
    @Column(name = "word_id")
    var wordId: Int,

    var weights: String,

    var day: Date,

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    var user: User?,

    @ManyToOne
    @JoinColumn(name = "word_id", insertable = false, updatable = false)
    var word: Word?
)