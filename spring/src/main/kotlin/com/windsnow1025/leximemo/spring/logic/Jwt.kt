package com.windsnow1025.leximemo.spring.logic

import io.jsonwebtoken.Jwts

import javax.crypto.SecretKey

private val key: SecretKey = Jwts.SIG.HS256.key().build()

fun createTokenFromUsername(username: String): String {
    return Jwts.builder()
        .subject(username)
        .signWith(key)
        .compact()
}

fun parseUsernameFromToken(token: String): String {
    return Jwts.parser()
        .verifyWith(key)
        .build()
        .parseSignedClaims(token)
        .payload
        .subject
}