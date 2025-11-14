package com.codetogive.codetogitteam3.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DTOTransaction(
    Long id,
    Long userId,
    Long subscriptionId,
    BigDecimal amount,
    LocalDateTime transctionTime,
    Boolean anonymous
)
{}
