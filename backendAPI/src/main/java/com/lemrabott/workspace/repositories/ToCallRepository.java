package com.lemrabott.workspace.repositories;

import com.lemrabott.workspace.models.ToCall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ToCallRepository extends JpaRepository<ToCall, UUID> {
}
