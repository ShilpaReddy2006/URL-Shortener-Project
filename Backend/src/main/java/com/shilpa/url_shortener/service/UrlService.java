package com.shilpa.url_shortener.servise;

import com.shilpa.url_shortener.dtos.UrlRequest;
import com.shilpa.url_shortener.dtos.UrlResponse;

public interface UrlService {

	    UrlResponse createShortUrl(UrlRequest request);

	    String redirect(String shortCode);



}
