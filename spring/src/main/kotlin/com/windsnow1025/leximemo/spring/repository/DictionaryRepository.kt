package com.windsnow1025.leximemo.spring.repository

import com.windsnow1025.leximemo.spring.entity.Dictionary
import com.windsnow1025.leximemo.spring.entity.Word
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface DictionaryRepository : JpaRepository<Dictionary, Int> {
}