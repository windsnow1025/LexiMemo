package com.windsnow1025.leximemo.spring.entity

import java.io.Serializable
import jakarta.persistence.*

@Embeddable
class UserWordId(
    var userId: Int,
    var wordId: Int
) : Serializable