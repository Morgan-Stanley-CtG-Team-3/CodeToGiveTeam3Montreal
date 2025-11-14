package com.codetogive.codetogitteam3.domain;

public class TransactionMapper {
    public static DTOTransaction toDTO(Transaction transaction) {
        if (transaction == null) {
            return null;
        }

        return new DTOTransaction(
                transaction.getId(),
                transaction.getUser() != null ? transaction.getUser().getId() : null,
                transaction.getSubscription() != null ? transaction.getSubscription().getId() :null,
                transaction.getAmount(),
                transaction.getTransactionTime(),
                transaction.getAnonymous()
        );
    }
}
