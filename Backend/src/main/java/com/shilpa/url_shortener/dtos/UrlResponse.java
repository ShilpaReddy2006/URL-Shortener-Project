package com.shilpa.url_shortener.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UrlResponse {
	  private String originalUrl;
	  private String shortCode;


}
