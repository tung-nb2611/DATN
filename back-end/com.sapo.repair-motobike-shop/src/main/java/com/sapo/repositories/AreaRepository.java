package com.sapo.repositories;

import com.sapo.entities.Areas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface AreaRepository extends JpaRepository<Areas, Long> {
}
