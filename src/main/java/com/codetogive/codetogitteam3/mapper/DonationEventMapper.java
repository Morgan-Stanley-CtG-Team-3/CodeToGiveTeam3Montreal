package com.codetogive.codetogitteam3.mapper;

import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.dto.event.DonationEventDTO;
import java.time.format.DateTimeFormatter;


// Then in toDTO:

public class DonationEventMapper {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;
    public static DonationEventDTO toDTO(DonationEvent event) {
        if (event == null) {
            return null;
        }

        return new DonationEventDTO(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getGoalAmount(),
                event.getCurrentAmount(),
                event.getStartDate() != null ? event.getStartDate().format(DATE_FORMATTER) : null,
                event.getEndDate() != null ? event.getEndDate().format(DATE_FORMATTER) : null
        );
    }
}
