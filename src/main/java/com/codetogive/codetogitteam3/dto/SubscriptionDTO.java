package com.codetogive.codetogitteam3.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record SubscriptionDTO(
    Long id,
    Long userId,
    @jakarta.validation.constraints.NotNull BigDecimal amount,
    com.codetogive.codetogitteam3.domain.Subscription.Status status,
    LocalDateTime creatAt,
    LocalDateTime cancelAt) {
}
