package com.codetogive.codetogitteam3.controller;

import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.dto.CreateSubscriptionRequest;
import com.codetogive.codetogitteam3.dto.SubscriptionDTO;
import com.codetogive.codetogitteam3.repository.SubscriptionRepository;
import com.codetogive.codetogitteam3.service.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @PostMapping
    public ResponseEntity<SubscriptionDTO> create(@RequestBody @Valid CreateSubscriptionRequest req) {
        return ResponseEntity.ok(subscriptionService.create(req));
    }

    @DeleteMapping
    public ResponseEntity<Void> cancel(@RequestParam String email) {
        subscriptionService.cancel(email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<SubscriptionDTO> get(@RequestParam String email) {
        return ResponseEntity.ok(subscriptionService.get(email));
    }
}