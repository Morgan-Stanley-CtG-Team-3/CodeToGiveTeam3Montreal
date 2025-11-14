package com.codetogive.codetogitteam3.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record SubscriptionDTO(
        Long id,
        Long userId,
        BigDecimal amount,
        SubscriptionStatus status,
        LocalDateTime creatAt,
        LocalDateTime cancelAt
) {}
