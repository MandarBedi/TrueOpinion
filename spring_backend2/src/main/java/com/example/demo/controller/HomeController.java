package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HomeController {
	
	@GetMapping("/")
	public String home() {
		return "<h1>Welcome from Spring boot localhost:5400/</h1>";
	}
}
