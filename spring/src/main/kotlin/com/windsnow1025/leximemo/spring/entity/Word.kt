package com.windsnow1025.leximemo.spring.entity

import com.fasterxml.jackson.annotation.JsonInclude
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@JsonInclude(JsonInclude.Include.NON_NULL)
@Table("word")
data class Word(@Id var id: Int?, val word: String, var translation: String, var exampleSentence: String?, var frequency: Int?)