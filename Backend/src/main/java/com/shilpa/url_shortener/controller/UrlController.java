package com.shilpa.url_shortener.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shilpa.url_shortener.dtos.UrlRequest;
import com.shilpa.url_shortener.dtos.UrlResponse;
import com.shilpa.url_shortener.servise.UrlService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/urls")
public class UrlController {

    private final UrlService service;

    public UrlController(UrlService service) {
        this.service = service;
    }
    @PostMapping
    public UrlResponse create(@RequestBody
    		UrlRequest request) {
        return service.createShortUrl(request);
    }
    @GetMapping("/{shortCode}")
    public void redirectToOriginalUrl(@PathVariable String shortCode, HttpServletResponse response) throws IOException {

        String originalUrl = service.redirect(shortCode);

		response.sendRedirect(originalUrl);
    }
   
}



