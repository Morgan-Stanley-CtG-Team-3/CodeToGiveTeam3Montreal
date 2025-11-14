package com.codetogive.codetogitteam3.service;


import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.repository.DonationEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationEventService {

  private final DonationEventRepository repo;

  public List<DonationEvent> listActive() {
    return repo.findByActiveTrue();
  }

  @Transactional
  public DonationEvent create(DonationEvent e) {
    return repo.save(e);
  }

  @Transactional
  public DonationEvent donate(Long id, double amount) {
    DonationEvent e = repo.findById(id).orElseThrow();
    if (!e.isActive()) throw new IllegalStateException("Event inactif");
    if (amount <= 0) throw new IllegalArgumentException("Montant invalide");
    e.setCurrentAmount(e.getCurrentAmount() + amount);
    if (e.getCurrentAmount() >= e.getGoalAmount()) {
      e.setActive(false);
    }
    return e;
  }

  @Transactional
  public void closeExpired() {
    LocalDate today = LocalDate.now();
    repo.findByActiveTrue().forEach(ev -> {
      if (ev.getEndDate() != null && ev.getEndDate().isBefore(today)) {
        ev.setActive(false);
      }
    });
  }
}