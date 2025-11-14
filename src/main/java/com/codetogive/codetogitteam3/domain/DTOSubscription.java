package com.codetogive.codetogitteam3.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DTOSubscription(
        Long id,
        Long userId,
        BigDecimal amount,
        SubscriptionStatus status,
        LocalDateTime creatAt,
        LocalDateTime cancelAt
) {}
