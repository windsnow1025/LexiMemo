package com.windsnow1025.leximemo.spring.entity

import jakarta.persistence.*
import java.time.LocalDate

@Embeddable
open class UserWordKey(
    @Column(name = "user_id", nullable = false)
    val userId: Int,

    @Column(name = "word_id", nullable = false)
    val wordId: Int
)

@Entity
@Table(name = "user_word")
open class UserWord(
    @EmbeddedId
    open var id: UserWordKey,

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    open var user: User,

    @ManyToOne
    @JoinColumn(name = "word_id", nullable = false, insertable = false, updatable = false)
    open var word: Word,

    @Column(name = "weight")
    open var weight: Double?,

    @Column(name = "day")
    open var day:LocalDate?
)
