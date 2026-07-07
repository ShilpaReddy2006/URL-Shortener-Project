package com.shilpa.url_shortener.servise;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.shilpa.url_shortener.dtos.UrlRequest;
import com.shilpa.url_shortener.dtos.UrlResponse;
import com.shilpa.url_shortener.entity.UrlEntity;
import com.shilpa.url_shortener.repository.UrlRepository;

@Service
public class UrlServiceImpl implements UrlService {
	private final UrlRepository repository;
	public UrlServiceImpl(UrlRepository repository) {
	        this.repository = repository;
	 }

	@Override
	public UrlResponse createShortUrl(UrlRequest request) {
		String code = UUID.randomUUID()
                .toString()
                .substring(0, 6);

        UrlEntity entity = UrlEntity.builder()
                .originalUrl(request.getOriginalUrl())
                .shortCode(code)
                .clickCount(0L)
                .build();

        repository.save(entity);

        return UrlResponse.builder()
                .originalUrl(entity.getOriginalUrl())
                .shortCode(entity.getShortCode())
                .build();
    }

    @Override
    public String redirect(String shortCode) {

        UrlEntity entity = repository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("URL not found"));

        entity.setClickCount(entity.getClickCount() + 1);
        repository.save(entity);

        return entity.getOriginalUrl();
    }

}


